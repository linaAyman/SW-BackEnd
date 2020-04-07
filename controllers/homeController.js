var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {Category}=require('../models/Category')
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

async function getCategories(){
    let Home=[];
    Home=await Category.find({name:{$in:["WorkOut","Chill","Happy"]}},{'name':1 , 'playlists':{$slice:7},'_id':0})
                            .populate('playlists','name image id description -_id')
    return Home;
}
exports.seeAllCategory=async function(req,res){
    
}


//===============================Loading the home page========================//
exports.getHome=async function(req,res){


    /*const token = req.headers.authorization.split(" ")[1];
    let recentlyPlayed=[];
    if(token){
            const decoded = jwt.decode(token);
            recentlyPlayed=await getPlayHistory(decoded._id)
    }*/
    let Home=await getCategories()
    return res.status(200).json({Home})


}

