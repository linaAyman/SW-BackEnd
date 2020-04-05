var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;



///==============================Saving a recently played track in play history object
exports.saveTrack = async function saveTrack (req, res){

    if(!req.query.trackId) return res.status(404).send({ message: "trackId haven't been sent in the request" })
    if(!req.query.contextUri) return res.status(404).send({ message: "contextUri haven't been sent in the request" })

    const { error } = validateContext(req.query.contextUri)
    if (error) return res.status(404).send({ msg: error.details[0].message })


    const token = req.headers.authorization.split(" ")[1];
    if(token){   
        const decoded = jwt.decode(token);
        contextUri=JSON.parse(req.query.contextUri)
        trackObjectId=await Track.find({id:req.query.trackId},{'_id':1})
                            

        let isExistPlayHistory=await PlayHistory.find({userId:decoded._id})
                                        

        if(isExistPlayHistory.length===0){
            
            let playHistory= new PlayHistory({
                History:{
                    context:contextUri,
                    itemPlaying:ObjectId(trackObjectId[0]._id)
                },
                userId:decoded._id
            })
            await playHistory.save()
                        
        }
        else{
            await PlayHistory
                        .updateOne({userId:decoded._id},{$push:{History:{
                        context:contextUri,
                        itemPlaying:ObjectId(trackObjectId[0]._id)}}
                        })

        }   
        res.status(200).json({message:'OK'})

    }
    else{
        return 
    }
};

exports.playTrack=async function(req,res){
    const token = req.headers.authorization.split(" ")[1];
    if(token){   
        const decoded = jwt.decode(token)
        let type=req.query.type
        let index=req.query.index
        if(type=="playlist"){


        }





        res.status(200).json({message:'OK'})
    }
    else{
        return;
    }


}