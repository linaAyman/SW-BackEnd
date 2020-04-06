var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {checkAuth}=require('../middleware/checkAuth')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;

//=================================get play history from database=========================//
async function getPlayHistory(userId){

    let historyDocument=await PlayHistory.findOne({userId:userId},{'History':1,'_id':0})
    let historyArr=historyDocument.History;
    let historyLen=historyArr.length
    let recentlyPlayed=[];

    for(let i=0;i<historyLen;i++){

        if(historyArr[i].context.type=="track"){
          
            let tracks=await Track.findOne({id:historyArr[i].context.id},{'_id':0,'id':1,'name':1,'image':1,'type':1})
                                  .populate('artists','name -_id')
       
            recentlyPlayed.push(tracks);
        }
        else if(historyArr[i].context.type=="playlist"){

           let playlists= await Playlist.findOne({id:historyArr[i].context.id},{'_id':0,'id':1,'image':1,'name':1,'description':1,'type':1})
           recentlyPlayed.push(playlists);

        }
    }
    return recentlyPlayed;
}


//===============================Loading the home page========================//
exports.getHome=async function(req,res){


    const token = req.headers.authorization.split(" ")[1];
    let recentlyPlayed=[];
    if(token){
            const decoded = jwt.decode(token);
            recentlyPlayed=await getPlayHistory(decoded._id)
    }
    return res.status(200).json({recentlyPlayed})


}

