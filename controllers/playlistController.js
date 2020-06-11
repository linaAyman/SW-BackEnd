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
const Joi=require('joi');

function validate(req) {
  const schema = {
    image:
      Joi.required()
  }
  return Joi.validate(req, schema);
};
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
    
  try
  {
    let PID = req.params.id
    let playlistOwner = await Playlist.find({id:PID},{'_id':0, 'owner':1});
    let playlistOwnerId = (playlistOwner[0].owner);
    
    let trackCount = await Playlist.find({id:PID},{'_id':0,'totalTracks':1},);
    let totalTracks = trackCount[0].totalTracks+1;
   
    if(userOID == playlistOwnerId )
        {
        let track = req.body.ids
        let tracksTemp = await Track.find({id:track},{_id:1})
        let playlistId = await Playlist.find({id:PID},{'_id':1});
        tracksTemp.forEach(async function (value,index){
          let IdTrackArrays = tracksTemp[index]._id
          await Playlist
            .updateOne({_id:playlistId}, {$push:{'tracks':IdTrackArrays}}  );
          totalTracks=totalTracks+index;
          await Playlist
             .updateOne({_id:playlistId},{'totalTracks':totalTracks}  );
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
/**
 * @memberof module:playlistController
 * @function {createPlaylist} create a new playlist and add it in user's library
 * @param {req.query.name} name of the playlist
 * @param {req.headers.Authorization} token of current logged in user
*/
exports.createPlaylist=async function(req,res){
  
  const userOID=getOID(req);
  //if user object ID is 555555555555555555555555 then Spotify is the owner of playlist
  console.log(userOID);
  let playlistId=mongoose.Types.ObjectId();// generate ID for the playlist
  //upload a default image for any created playlist
  const { error } = validate({
    image: req.files['image']
  })
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const imageArray = req.files['image'];

    if (imageArray[0].destination != "./images") {
      return res.status(400).send({ message: "You should enter correct format in image" });
    }

  const imageURL_0 = imageArray[0].destination + '/' + imageArray[0].filename;
  console.log(imageURL_0);
  const playlist=new Playlist({
    name:req.query.name,
    id: playlistId,
    owner:userOID,
    totalTracks:0,
    popularity:0,
    description:"",
    followers:0,
    image:imageURL_0
    //add image
  })

  //save playlist in database
  await playlist.save();
  

  //save the created playlist in Library
  await Library.findOneAndUpdate({user:userOID},{$push:{playlists:playlist._id}});
  await Library.updateOne({user:userOID},{$inc:{playlistsCount:1}})
  return res.status(200).json({playlistid:playlistId,message :'OK'})

};

//===================================================Like Playlist =======================////////////////
/**
 * @memberof module:playlistController
 * @function {likePlaylist} add playlist to likes of current user's library
 * @param {req.header.Authorization} token of current user
 * @param {req.body.id} Id of playlist that user want to add to his playlist
 */
exports.likePlaylist=async function(req,res){

  let playlistToLike=req.body.id;
  if(!playlistToLike) return res.status(404).send({ message: "PlayListId haven't been sent in the request" })
  const userOID=getOID(req);  // find user object ID 

  //find object ID of the playlist
  let playlistsTemp=await Playlist.findOne({id:req.body.id},{playlistId:'_id'})
  //add playlist to array of user's playlists in Library
  await Library.findOneAndUpdate({ user:userOID},{$push:{'playlists':playlistsTemp._id}});
  await Library.updateOne({user:userOID},{$inc:{playlistsCount:1}})
  // notification to playlist owner that the user liked his playlist
  notificationController.addLikeNotification(playlistsTemp,userOID);

  return res.status(201).json({message :'OK'})

};
//==========================dislike playlist
/**
 * @memberof module:playlistController
 * @function {dislike playlist} remove playlist from current user's library
 * @param {req.header.Authorization} token of current user
 * @param {req.body.id} Id of playlist that user want to remove from his playlist
 */
exports.deletePlaylist=async function(req,res){
  let playlistToLike=req.body.id;
  if(!playlistToLike) return res.status(404).send({ message: "PlayListId haven't been sent in the request" })
  const userOID=getOID(req);  // find user object ID 
  //find object ID of the playlist
  let playlistsTemp=await Playlist.findOne({id:req.body.id},{playlistId:'_id'})
  //remove playlist from user's playlists in Library
  await Library.updateOne({ user: userOID }, { $pull: { playlists:playlistsTemp._id } });
  await Library.updateOne({user:userOID},{$inc:{playlistsCount:-1}})
  return res.status(200).json({ message: 'Deleted Successfully' })

}
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
          let track = req.body.tracks
          let tracksTemp = await Track.find({id:track},{_id:1})
        
          tracksTemp.forEach(async function (value,index){
          await Playlist
          .updateOne({id:req.params.id},{$pull:{tracks:tracksTemp[index]._id}} );
          })
          let totalTracks = await Playlist.find({id:req.params.id},{tracks:1,_id:1})
          await Playlist
          .updateOne({id:req.params.id},{'totalTracks':totalTracks[0].tracks.length}  );

          return res.sendStatus(200);
      
     } catch{
      return res.sendStatus(404);
    
  }} else{
    return res.sendStatus(403);    
  }
 
}
/**need edit ya salma */
exports.editplaylist= async (req, res)=> {
  const { error } = validate({
    image: req.files['image']
  })
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const imageArray = req.files['image'];

    if (imageArray[0].destination != "./images") {
      return res.status(400).send({ message: "You should enter correct format in image" });
    }

  const imageURL_0 = imageArray[0].destination + '/' + imageArray[0].filename;

};
