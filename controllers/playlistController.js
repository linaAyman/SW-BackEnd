/**
 * @module playlistController
 */
const getOID=require('../middleware/getOID');
const {Library}=require('../models/Library')
/**
 * A model for playlst 
 * @model playlist
 */
const {Playlist} = require('../models/Playlist')
const mongoose=require('mongoose');

/**
 * A model for track 
 * @model track
 */
const { Track }=require('../models/Track')
const notificationController = require('../controllers/notificationController')
const jwt = require("jsonwebtoken");

/**
 * @async
 * @memberof module:playlistController
 * @function {getPlaylist}
 * Gets the specific Playlist by the sent id in the request
 * @param {URL} req - the request that calls getPlaylist Function
 * @param {object} res - the response on the request sent by the function
 */

exports.getPlaylist = async (req, res)=> {
    console.log(req.params.id)
    let playlist = await Playlist.find({id: req.params.id})
     res.send(playlist)
  
};

/**
 * @async
 *  @memberof module:playlistController
 * @function {getAllTracks} get all tracks in playlist given it's id
 * @param {req.params.id} id playlistId
 * @returns {array} tracks the tracks in playlist with their name/id/url/image/artists and generes
 */
exports.getAllTracks=async(req,res)=>{
    let tracks=await Playlist.findOne({id:req.params.id},{'tracks':1,'_id':0})
                             .populate({path:'tracks',select:'name image id artists previewUrl url-_id', populate:{path:'artists',select:'name id -_id'}});

    
    return res.status(200).send(tracks)
};
/**
 * @async 
 *  @memberof module:playlistController
 * @function
 * adding a track to current user playlist
 * @param {URL} req -send album Id
 * @param {object} res -the response on the given request
 * @returns - return the status of the function after being executed
 */
exports.addTrack= async function(req,res){

  const userOID=getOID(req);
  /*const token1 = jwt.sign(
      { _id:  "5e848bf8da28c351f47c1ec8" ,
        name: "Ayleeeeeeen 21 ", 
      },
      process.env.JWTSECRET,
      {
        expiresIn: '7d'
      }
    );
    res.send(token1)
   // console.log(token1)*/
    
    let query = req.baseUrl;
    let temp = query.substr(11,query.length-2);
  try
  {
    let playlistOwner = await Playlist.find({id:temp},{'_id':0, 'owner':1});
    let playlistOwnerId = (playlistOwner[0].owner);
    let trackCount = await Playlist.find({id:temp},{'_id':0,'totalTracks':1},);
    let totalTracks = trackCount[0].totalTracks+1;
   
    if(userOID == playlistOwnerId )
        {
          
        let inputUris = req.query.uris;
        let uriArray = inputUris.split(",")
        let playlistId = await Playlist.find({id:temp},{'_id':1});
    
        uriArray.forEach(async function (value,index){
          let searchResult = await Track.findOne({uri:uriArray[index]},{'_id':1})
          TrackId=searchResult._id
          
          if(searchResult){
         
            await Playlist
            .updateOne({_id:playlistId}, {$push:{'tracks':TrackId}}  );
            totalTracks=totalTracks+index;
            await Playlist
             .updateOne({_id:playlistId},{'totalTracks':totalTracks}  );
         
            
          }
      });

  
      return res.sendStatus(201);
    } 
    else{
      return res.sendStatus(403);
    }
  }catch{
  
      return res.sendStatus(403);
    }

 
  } 
//================================================Create Playlist=================================//

exports.createPlaylist=async function(req,res){
  
  const userOID=getOID(req);
  //if user object ID is 555555555555555555555555 then Spotify is the owner of playlist
  console.log(userOID);

  const playlist=new Playlist({
    name:req.query.name,
    id: mongoose.Types.ObjectId(),
    owner:userOID,
    totalTracks:0,
    popularity:0,
    description:"",
    followers:0
    //add image
  })

  //save playlist in database
  await playlist.save();
  

  //save the created playlist in Library
  await Library.findOneAndUpdate({user:userOID},{$push:{playlists:playlist._id}});
  console.log(await Library.findOne({user:userOID}))
  return res.status(200).json({message :'OK'})

};

//===================================================Like Playlist =======================////////////////
exports.likePlaylist=async function(req,res){

  let playlistToLike=req.body.id;
  if(!playlistToLike) return res.status(404).send({ message: "PlayListId haven't been sent in the request" })
  const userOID=getOID(req);  // find user object ID 

  //find object ID of the playlist
  let playlistsTemp=await Playlist.findOne({id:req.body.id},{playlistId:'_id'})
  //add playlist to array of user's playlists in Library
  await Library.findOneAndUpdate({ user:userOID},{$push:{'playlists':playlistsTemp._id}});
  // notification to playlist owner that the user liked his playlist
  notificationController.addLikeNotification(playlistsTemp,userOID);

  return res.status(201).json({message :'OK'})

};
//-------------------------Delete track from Playlist----------------------------------//
/**
 * @memberof module:playlistController
 * @function {removeTrack} to delete a track from existing playlist 
 * @param req 
 * @param res
 */
exports.removeTrack=async function(req,res){

  const userOID=getOID(req);
  
  let playlistOwner = await Playlist.find({id:req.params.id},{'_id':0, 'owner':1});
  let playlistOwnerId = (playlistOwner[0].owner);
 
  if(userOID == playlistOwnerId ){
  try{   
          track = req.body.tracks
          let tracksTemp = await Track.find({id:track},{_id:1})
        
          tracksTemp.forEach(async function (value,index){
          await Playlist
          .updateOne({id:req.params.id},{$pull:{tracks:tracksTemp[index]._id}} );
          })
          let totalTracks = await Playlist.find({id:req.params.id},{tracks:1,_id:1})
          await Playlist
          .updateOne({id:req.params.id},{'totalTracks':totalTracks[0].tracks.length}  );

          return res.sendStatus(200);//.json({"message" :'Deleted Successfully'})
      
     } catch{
      return res.sendStatus(404);//.json({"message" :'Auth failed'})
    
  }} else{
    return res.sendStatus(403);    
  }
 
}