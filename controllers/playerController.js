/**
*@module playerController
*/

var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;


/**
 * playerController saveTrack
 * @memberof module:playerController
 * @function saveTrack
 * @param {token} req.headers.authorization the token to identify user by and save the given track in his recently played category to be showed in home later
 * @param {id} req.params.id the id of playlist or track to be saved that he listened to it it will be id of playlist if he listened to this track within a playlist
 * 
 */
exports.saveTrack=async function (req,res){


  
       /// trackObjectId=await Track.find({id:trackId},{'_id':1})
                            

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token)
        let userId=decoded._id
        let playId=req.params.id
        let type="playlist"
        
        let isExistPlayHistory=await PlayHistory.find({userId:userId})
        let contextObject={
            type:type,
            id:playId//,
            ///index:isExistPlayHistory.context.index+1
        }
                               

        if(isExistPlayHistory.length===0){
            
            let playHistory= new PlayHistory({
                History:{
                    context:contextObject,
                   // itemPlaying:trackObjectId[0]._id
                },
                userId:userId
            })
            await playHistory.save()
                        
        }
        else{
         
            await PlayHistory
                        .updateOne({userId:userId},{$push:{History:{
                        context:contextObject}}})//,
                       /// itemPlaying:trackObjectId[0]._id}}
        }   
       
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
        

        console.log(parseInt(index));
        if(type=="playlist"){
            let playName=await Playlist.findOne({id:playId},{'name':1,'_id':0});
            if(!playName) 
                    return res.status(404).json({message:"This playlist doesn't exist"})
            
            let trackObjectId=await Playlist.aggregate([{$match:{"id":playId}},
                                                        {$project:{track:{$arrayElemAt:['$tracks',parseInt(index)]}}}])

                                                  

            console.log(trackObjectId[0].track)
            track=await Track.findOne({_id:trackObjectId[0].track},
                                          {'name':1,'_id':0,'type':1,'id':1,'image':1,'url':1,'artists':1})
                                         .populate('artists','name genres id type -_id');
            console.log(track);
            saveTrack(playId,track.id,decoded._id,"playlist");
        }
        else if(type=="track"){
            console.log(playId);
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