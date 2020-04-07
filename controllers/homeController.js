var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {Category}=require('../models/Category')
var { Album }=require('../models/Album')
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
//=================================get 3 categories in home page================//
async function getCategories(){
    let Home=[];
    Home=await Category.find({name:{$in:["WorkOut","Chill","Happy"]}},{'name':1 ,'type':1, 'playlists':{$slice:7},'_id':0})
                    .populate('playlists','name image type id description -_id')
    return Home;
}
async function getMostPopular(number){
    console.log(number)
        let popularPlaylists = await Playlist
                                        .find({},{'_id':0,'name':1,'id':1,'description':1,'image':1,'type':1})
                                        .limit(number)
                                        .sort({popularity: 1})
                                        console.log(popularPlaylists)
        let popular={
            playlists:popularPlaylists,
            description:"Most popular around world",
            name:"Most Popular Playlists"
        }
        return popular;
}
async function getNewReleases (){
  
    let releaseAlbums = await Album
                               .find({},{'_id':0,'name':1,'id':1,'label':1,'image':1,'type':1})
                               .populate('artists','name id -_id')
                               .sort({releaseDate: -1})
    let releases={
        albums:releaseAlbums,
        description:"Newest Albums Released with your artits",
        name:"Released Albums"
    };
    console.log(releases)
    return releases
}



//==================================for see all in home page==================//
exports.seeAll=async function(req,res){
    if(req.params.name=="Chill"||req.params.name=="WorkOut"||req.params.name=="Happy"){

        category=await Category.findOne({name:req.params.name},{'name':1 ,'type':1, 'playlists':1,'_id':0})
                        .populate('playlists','name image id description -_id')
        res.status(200).json({category});

    }
    else if(req.params.name=="Most Popular Playlists"){
        res.status(200).json(await getMostPopular(10))
    }
    else if(req.params.name=="Released Albums"){
        res.status(200).json(await getNewReleases())

    }
    else
        res.status(404).json({'message':'sorry this is not supported'})

}



//===============================Loading the home page========================//
exports.getHome=async function(req,res){


    let Home=[];
    let categories=await getCategories();
    Home.push(categories[0])
    Home.push(categories[1])
    Home.push(categories[2])
    ///let mostpopular=
    Home.push(await getMostPopular(6));
   // let newReleases=await getNewReleases()
    Home.push(await getNewReleases());
    return res.status(200).json({Home})


}




/*var { PlayHistory,validateContext,validateParameters }=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {Category}=require('../models/Category')
var { Album }=require('../models/Album')
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
//=================================get 3 categories in home page================//
async function getCategories(){
    let Home=[];
    Home=await Category.find({name:{$in:["WorkOut","Chill","Happy"]}},{'name':1 , 'playlists':{$slice:7},'_id':0})
                    .populate('playlists','name image id description -_id')
    return Home;
}
async function getMostPopular(number){
    console.log(number)
        let popularPlaylists = await Playlist
                                        .find({},{'_id':0,'name':1,'id':1,'description':1,'image':1,'type':1})
                                        .limit(number)
                                        .sort({popularity: 1})
                                        console.log(popularPlaylists)
        let popular={
            popularPlaylists:popularPlaylists,
            description:"Most popular around world",
            name:"Most Popular Playlists"
        }
        return popular;
}
async function getNewReleases (){
  
    let releaseAlbums = await Album
                               .find({},{'_id':0,'name':1,'id':1,'description':1,'image':1,'type':1})
                               .populate('artists','name id -_id')
                               .sort({releaseDate: -1})
    let releases={
        releaseAlbums:releaseAlbums,
        description:"Newest Albums Released with your artits",
        name:"Released Albums"
    };
    console.log(releases)
    return releases
}

//==================================for see all in home page==================//
exports.seeAllCategory=async function(req,res){
    category=await Category.findOne({name:req.params.name},{'name':1 , 'playlists':1,'_id':0})
                        .populate('playlists','name image id description -_id')
    res.status(200).json({category});

}
exports.getMostPopular = async (req, res) => {
    let popularPlaylists=await getMostPopular(10);
    res.status(200).json({popularPlaylists})
}


//===============================Loading the home page========================//
exports.getHome=async function(req,res){


    /*const token = req.headers.authorization.split(" ")[1];
    let recentlyPlayed=[];
    if(token){
            const decoded = jwt.decode(token);
            recentlyPlayed=await getPlayHistory(decoded._id)
    }*/
   /* let Home=[];
    let categories=await getCategories();
    Home.push(categories[0])
    Home.push(categories[1])
    Home.push(categories[2])
    ///let mostpopular=
    Home.push(await getMostPopular(6));
   // let newReleases=await getNewReleases()
    Home.push(await getNewReleases());
    return res.status(200).json({Home})


}*/

