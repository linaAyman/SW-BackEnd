/**
*@module playerController
*/

var { PlayHistory}=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {Artist}=require ('../models/Artist')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;
const getOID=require('../middleware/getOID');


/**
 * playerController saveTrack
 * @memberof module:playerController
 * @function saveTrack
 * @param {token} req.headers.authorization the token to identify user by and save the given track in his recently played category to be showed in home later
 * @param {id} req.params.id the id of playlist or track to be saved that he listened to it it will be id of playlist if he listened to this track within a playlist
 * 
 */
exports.saveTrack=async function (req,res){

        let userId=getOID(req);
        let playId=req.params.id
        let type=req.query.type; //the context that track was played from (Playlist,Album,Artist,LikedSongs playlist or track)
        
        //get object id of played item
        let playedItemOID;
        if(type=="Playlist")
            playedItemOID=await Playlist.findOne({id:playId},{'_id':1});
        else if(type=="Track")
            playedItemOID=await Track.findOne({id:playId},{'_id':1});
        else if(type=="Album")
            playedItemOID=await Album.findOne({id:playId},{'_id':1});
        else if(type=="LikedSongs")
            playedItemOID=playId
        else if(type=="Artist")
            playedItemOID=await Artist.findOne({id:playId},{_id:1})
        else
            res.status(404).json({'type':'The type you sent was incorrect'});


        let isExistPlayHistory=await PlayHistory.findOne({userId:userId})
        let contextObject={
            type:type,
            id:playedItemOID
        }
                               
        //check if this user has a play history object if he doesn't have a one then create it and add to it 
        // the played item , if he has a one then push the played item in the existing object

        if(!isExistPlayHistory){
            let playedItems=[];
            playedItems.push(contextObject)    
            let playHistory= new PlayHistory({
                History:playedItems,
                userId:userId
            })

            await playHistory.save()

                        
        }
        else{
            //first check if this item was played before if yes remove it from it's position to add it in the most recent position 

             let playeditems=await PlayHistory.findOne({userId:userId,History:{$elemMatch:{id:playedItemOID}}})


             if(playeditems){
                await PlayHistory.findOneAndUpdate({userId:userId},{"$pull":{"History":{id:playedItemOID}}})
             }
             else{
                 //increment the count of played items by 1
                await PlayHistory.updateOne({userId:userId},{$inc:{HistoryLen:1}})
             }
             await PlayHistory.findOneAndUpdate({userId:userId},{$push:{History:{$each:[contextObject],$position:0}}})
                            
        }  
      
        return res.status(200).json({message:'OK'});
       
};
//========================================For playing a playlist=============================//
/**
 * playerController playFirstTrack returns the first track in playlist to be played and save the track sent to user to be played in his history
 *@memberof module:playerController
 *@function playFirstTrack
 *@param {token} req.headers.authorization the token to identify user by and save the given track in his recently played category to be showed in home later
 *@param {id} req.params.id the id of playlist or track to be saved that he listened to it it will be id of playlist if he listened to this track within a playlist
 *@param {status} res.status 200 on success 404 if the playlist or track id is not valid or not sent
 *@param{track} track object on success contains url/image/name/id/artists
 */
exports.playFirstTrack=async function(req,res){
    const token = req.headers.authorization.split(" ")[1];
    if(token){   
        const decoded = jwt.decode(token)
        let type=req.query.type
        let index=req.query.index
        let playId=req.params.id;
        let track;
        

    
        if(type=="playlist"){
            let playName=await Playlist.findOne({id:playId},{'name':1,'_id':0});
            if(!playName) 
                    return res.status(404).json({message:"This playlist doesn't exist"})
            
            let trackObjectId=await Playlist.aggregate([{$match:{"id":playId}},
                                                        {$project:{track:{$arrayElemAt:['$tracks',parseInt(index)]}}}])

                                                  


            track=await Track.findOne({_id:trackObjectId[0].track},
                                          {'name':1,'_id':0,'type':1,'id':1,'image':1,'url':1,'artists':1})
                                         .populate('artists','name genres id type -_id');

            saveTrack(playId,track.id,decoded._id,"playlist");
        }
        else if(type=="track"){

            track=await Track.findOne({id:playId},
                                          {'name':1,'_id':0,'type':1,'id':1,'image':1,'url':1,'artists':1})
                                         .populate('artists','name genres id type -_id');
            if(!track) 
                return res.status(404).json({message:"This track doesn't exist"})
            saveTrack(playId,track.id,decoded._id,"track");


        }
        res.status(200).json({track})
    }
    else{
        return;
    }


}