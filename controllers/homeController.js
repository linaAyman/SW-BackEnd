/**
*@module homeController
*/

var { PlayHistory}=require('../models/PlayHistory')
var mongoose=require('mongoose')
var { Track }=require('../models/Track')
var { Playlist }=require('../models/Playlist')
var {Category}=require('../models/Category')
var { Album }=require('../models/Album')
var {checkAuth}=require('../middleware/checkAuth')
var jwt = require('jsonwebtoken')
var ObjectId=mongoose.Types.ObjectId;
const getOID=require('../middleware/getOID');

//=================================get play history from database=========================//
/**
 * homeController get recently played items for current logged in user
 * @memberof module:homeController
 * @function getPlayHistory
 * @param { req.headers.authorization} token the token to identify user by and save the given track in his recently played category to be showed in home later
 * @param {userId} userId of user to get his recently played playlists and tracks
 * @param {offset} number of elements to skip
 * @param {limit} number of elements to return
 * @returns {recentlyPlayed } recentlyPlayed of recently played tracks and playlists
 */
exports.getPlayHistory=async function(req,res){

    let offset=parseInt(req.query.offset);
    let limit=parseInt(req.query.limit);
    if(!offset) offset=0 //default values of offset and limit 
    if(!limit)  limit =6
    
    let userId=getOID(req);
    let historyDocument=await PlayHistory.findOne({userId:userId},{'History':1,'_id':0,'HistoryLen':1})
    let historyArr=historyDocument.History
    let historyLen=historyDocument.HistoryLen
    let recentlyPlayed=[];

    let start=offset;
    let end=Math.min(offset+limit,historyLen);
   
    for(let i=start;i<end;i++){

        if(historyArr[i].type=="Track"){
          
            let tracks=await Track.findOne({_id:historyArr[i].id},{'_id':0,'id':1,'name':1,'image':1,'type':1})
                                  .populate('artists','name -_id')
       
            recentlyPlayed.push(tracks);
        }
        else if(historyArr[i].type=="Playlist"){

           let playlists= await Playlist.findOne({_id:historyArr[i].id},{'_id':0,'id':1,'image':1,'name':1,'type':1,'description':1,'owner':1})
                                        
           recentlyPlayed.push(playlists);

        }
        else if(historyArr[i].type=="Artist"){
            let artists=await Artist.findOne({_id:historyArr[i].id},{'_id':0,'name':1,'image':1,'type':1,'id':1})
            recentlyPlayed.push(artists);
        }
        else if(historyArr[i].type=="LikedSongs"){
            recentlyPlayed.push({id:historyArr[i].id,type:historyArr[i].type});
        }
        else if(historyArr[i].type=="Album"){
            let album=await Album.findOne({_id:historyArr[i].id},{'_id':0,'name':1,'image':1,'type':1,'id':1})
            recentlyPlayed.push(album);
        }
    }
    return res.status(200).json(recentlyPlayed);
}
/**
 * homeController getMostPopular given offset and limit to be used in popular playlists which is in home page and see more 
 * @memberof module:homeController
 * @function {getMostPopular} returns the most popular playlists specified by given number
 * @param { offset} index of first playlist to be retrieved
 * @param { limit } number of playlists to be retrieved 
 * @returns {array} popular array of popular playlists 
 */
async function getMostPopular(offset,limit){
   
 
        let popularPlaylists = await Playlist
                                        .find({},{'_id':0,'name':1,'id':1,'description':1,'image':1,'type':1,'popularity':1})
                                        .sort({popularity:-1})

        var end=parseInt(limit)+parseInt(offset); // end index of array

        let popular={
            playlists:popularPlaylists.slice(offset,end),
            description:"Most popular around world",
            name:"Most Popular Playlists"
        }
        
        return popular;
}
/**
 * 
*/
exports.seeMoreMostPopular=async function(req,res){
    let offset=req.query.offset;
    if(!offset) offset=0
    let limit=req.query.limit;
    if(!limit) limit=6;
    let arrMostPopular=await getMostPopular(offset,limit);
    let playlists=arrMostPopular.playlists;
    let description=arrMostPopular.description;
    let name=arrMostPopular.name;
    return res.status(200).json({playlists,description,name});
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
    return releases
}
/**
 * homeController get playlists in categories for home page and see more
 * @memberof module:homeController
 * @function {getCategories} give name of category view all it's playlists 
 * @param {name} req.params.name, name of category to see all it's playlists
 * @param {limit} number of playlists to be returned from category
 * @param {offset} number of array elements to skip
 * @returns {code} status, 200 on success ,404 for invalid category name
 * @returns {array} category, if name is Chill/WorkOut/Happy
 */


async function getCategories(offset,limit,name){
 
    category=await Category.findOne({name:name},{'name':1 ,'type':1,'totalPlaylists':1 ,'_id':0,
                                                playlists:{"$slice":[Math.abs(offset),Math.abs(limit)]}})
                           .populate('playlists','name image id description -_id');
    return category;

}
/**
 * homeController seeMoreCategories
 * @memberof module:homeController
 * @function{seeMoreCategories} get certain portion of array of category's playlists for the pagination
 * @param{offset} number of playlists to skip
 * @param {limit} number of playlists to return
 * @param {name} name of category 
 * @returns {category} array of playlists for certain category
*/

exports.seeMoreCategories=async function(req,res){
    let offset=parseInt(req.query.offset);
    let limit=parseInt(req.query.limit);
    let name =req.params.name;
    category=await getCategories(offset,limit,name);
    
    return res.status(200).json({category});
}


//===============================Loading the home page========================//
/**
 * homeController getHome
 * @memberof module:homeController
 * @function {getHome} returns all cards in the Home categories,popular playlists and released albums
 * @returns {array} Home array of all categories to be viewed in home each category has 6 playlists
 */
exports.getHome=async function(req,res){
    let Home=[];
    let categories=[];
    categories=await Category.find({},{name:'1','_id':0}); // get array of categories that stored in db
    // for every category get it's data and playlists (number of playlists is 6 by default)
    for(let i=0;i<categories.length;i++)
        Home.push(await getCategories(0,6,categories[i].name)); // save category data in array Home which contains every card in Home page
    Home.push(await getMostPopular(0,6));
    Home.push(await getNewReleases());
    return res.status(200).json({Home})
}


exports.getReleasedAlbums = async function(req,res){
  //  let temp1 = Date.now
    console.log("hellooooooooooooooooooooo")
     // await Album.find({release_date:})
    var today = new Date().toISOString();
    var PreviousMonth = new Date();
    var targetMonth = PreviousMonth.getMonth() - 1;
    PreviousMonth.setMonth(targetMonth);
    console.log(today)
    console.log(PreviousMonth);
    let album = await Album.find({release_date:{ $lte:today,$gte:PreviousMonth}})
    res.send(album)
   }

//===============================Loading the user's own playlists========================//
/**
 * homeController getCurrentUserPlaylists
 * @memberof module:homeController
 * @function {getCurrentUserPlaylists} returns all playlists in the User library 
 * @returns {array} playlists array of the user
 */
exports.getCurrentUserPlaylists = async (req, res)=> {

    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.decode(token)
    console.log(decoded)
    let uId = decoded._id

    let userPlaylists = await Playlist.find({owner: uId})
    res.send(userPlaylists)
};