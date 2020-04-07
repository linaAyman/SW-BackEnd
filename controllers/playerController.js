var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;



///==============================Saving a recently played track in play history object
exports.saveTrack=async function (playId,trackId,userId,type){
  
        trackObjectId=await Track.find({id:trackId},{'_id':1})
                            
    
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
//========================================For playing a shuffle playlist=============================//
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