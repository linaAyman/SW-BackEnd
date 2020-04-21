/**
*@module homeController
*/

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
/**
 * homeController getPlayHistory
 * @memberof module:homeController
 * @function getPlayHistory
 * @param { req.headers.authorization} token the token to identify user by and save the given track in his recently played category to be showed in home later
 * @param {objectId} userId of user to get his recently played playlists and tracks
 * @returns {array } recentlyPlayed of recently played tracks and playlists
 */
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
/**
 * homeController getCategories
 * @memberof module:homeController
 * @function getCategories
 * @returns {array} Home the three categories in database (Chill/WorkOut/Happy)
 */
async function getCategories() {
    
    let Home=[];
    Home=await Category.find({name:{$in:["WorkOut","Chill","Happy"]}},{'name':1 ,'type':1,'totalPlaylists':1, 'playlists':{$slice:7},'_id':0})
                    .populate('playlists','name image type id  description -_id')
    //console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    ///console.log(Home)
    return Home;
};

//exports.getTCategory=getCategories;

/**
 * homeController getMostPopular
 * @memberof module:homeController
 * @function {getMostPopular} returns the most popular playlists specified by given number
 * @param { number} number of popular playlists to be returned
 * @returns {array}  popular array of popular playlists 
 */
async function getMostPopular(number){
   
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
/**
 * homeController getNewReleases
 * @memberof module:homeController
 * @function {getNewReleases} get the newly released albums
 * @returns {array} releases array of albums
 */
async function getNewReleases (){
  
    let releaseAlbums = await Album
                               .find({},{'_id':0,'name':1,'id':1,'label':1,'image':1,'type':1})
                               .populate('artists','name id -_id')
                              
    let releases={
        albums:releaseAlbums,
        description:"Newest Albums Released with your artits",
        name:"Released Albums"
    };
    console.log(releases)
    return releases
}



//==================================for see all in home page==================//
/**
 * homeController seeAll
 * @memberof module:homeController
 * @function {seeAll} give name of category view all it's playlists 
 * @param {name} req.params.name, name of category to see all it's playlists
 * @returns {code} status, 200 on success ,404 for invalid category name
 * @returns {array} category, if name is Chill/WorkOut/Happy
 * @returns {array} playlists, if name is most popular playlists
 * @returns {array} albums, if name is released albums
 */
exports.seeAll=async function(req,res){
    if(req.params.name=="Chill"||req.params.name=="WorkOut"||req.params.name=="Happy"){

        category=await Category.findOne({name:req.params.name},{'name':1 ,'type':1,'totalPlaylists':1 ,'playlists':1,'_id':0})
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
/**
 * homeController getHome
 * @memberof module:homeController
 * @function {getHome} returns all cards in the Home categories,popular playlists and released albums
 * @returns {array} Home array of all categories to be viewed in home each categoru has 6 playlists
 */
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




