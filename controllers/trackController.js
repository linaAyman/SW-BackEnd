/**
 * @module trackController
 */

const mongoose = require('mongoose')
const config = require('config')
const Joi = require('joi')
const { Track } = require('../models/Track')
const { YourLikedSongs } = require('../models/YourLikedSongs')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();
var randomHash = require('random-key');
const { Album } = require('../models/Album');
const { Artist } = require('../models/Artist');
const mm = require('music-metadata');
const util = require('util');
const User = require('../models/User');
const decode_id = require('../middleware/getOID');
const { getAudioDurationInSeconds } = require('get-audio-duration');
const notificationController = require('../controllers/notificationController')
const getOID=require('../middleware/getOID');

/**
* Trackcontroller valdiation
*@memberof module:controllers/trackControllers
*@param {string}   req.body.genre     artist enters genre of track
*@param {string}   req.body.name      artist enters name of track
*@param {array}   req.body.artist    artist enters his name and other artist coontribute in the song
*@param {file}     req.body.music     artist enters track as (mp3,wav,mpeg or wave)
*@param {file}  req.body.image     artist enters image of the track as (jpg,jpeg or png) 
*/
function Validate(req) {
  const schema = {
    genre:
      Joi.string().min(1).max(80).required(),
    name:
      Joi.string().min(3).max(30).required(),
    artist:
      Joi.array().items(Joi.string()).required(),
    music:
      Joi.required(),
    image:
      Joi.required()
  }
  return Joi.validate(req, schema);
};
exports.validateSong = Validate;
/**
* Trackcontroller uploadSong
*@memberof module:controllers/trackControllers
*@function uploadSong
*@param {function} checkAuth           Function for validate authenticatation
*@param {object}  req                  Express request object
*@param {object}  res                  response of track object
*/

/**here we just upload solo songs an it's image and assume that the artists' names are unique*/
exports.uploadSong = async (req, res) => {
  /**check who uploads the song */
  const decodedID = decode_id(req);
  const UserCheck = await User.findOne({ _id: decodedID });
  if (UserCheck.type == 'artist') {
    /**first valdiate data that the artist entered */
    const { error } = Validate({
      genre: req.body.genre,
      name: req.body.name,
      artist: req.body.artist,
      music: req.files['music'],
      image: req.files['image']
    })
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const musicArray = req.files['music'];
    const imageArray = req.files['image'];
     //multer check that the coming data is .jpg or .mp3 only so we have to check that he/she puts the correct format for images and music
    if( imageArray[0].destination != "./images" ){
      return res.status(400).send({ message: "You should enter correct format in image"});
    }
    if( musicArray[0].destination !=  "./uploads" ){
      return res.status(400).send({ message: "You should enter correct format in music"});
    }
    const fileURL = musicArray[0].destination + '/' + musicArray[0].filename;
    const imageURL = imageArray[0].destination + '/' + imageArray[0].filename;
    var count = 0;

    try {
      let ourTrack = await Track.find({ url: fileURL });
      if (ourTrack.length >= 1) {
         return  res.status(404).json({ message: "The song exists before" });
      }
      else {
        var ids = new Array();
        while (count < req.body.artist.length) {
          //here we search for each artist name to get her/his ids
          const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
          if (ourArtist) {
            ids[count] = ourArtist._id;
          }
          count++;
        }
        try {
          //make our model track with coming data
          const track = new Track({
            id: randomHash.generate(30),
            name: req.body.name,
            url: fileURL,
            artists: ids,
            genre: req.body.genre,
            imageURL: imageURL
          });
          track.external_urls.value = 'https://open.Maestro.com/tracks' + track.id;
          track.uri = 'Maestro:track:' + track.id;
          track.href = 'https://api.Maestro.com/v1/tracks/' + track.id;
          let newTrack = await track.save();
            // Making Notification to followers that artist uploaded song
        notificationController.addUploadSongNotification(UserCheck,req.body.name);
         return  res.status(200).json({ data: newTrack });
        } catch (err) {
         return res.status(404).json({ error: err });
        }
      
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } else {
   return res.status(404).json({ message: "only artists can upload songs" });
  }
};


/**
* Trackcontroller editTrack
*@memberof module:controllers/trackControllers
*@function editTrack
*@param {function} checkAuth           Function for validate authenticatation
*@param {object}  req                  Express request object
*@param {object}  res                  Express response 
*/

exports.editTrack = async (req, res) => {
  const decodedID = decode_id(req);
  const UserCheck = await User.findOne({ _id: decodedID });
  if (UserCheck.type == 'artist') {
    const { error } = Validate({
      genre: req.body.genre,
      name: req.body.name,
      artist: req.body.artist,
      music: req.files['music'],
      image: req.files['image']
    })
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const musicArray = req.files['music'];
    const imageArray = req.files['image'];
    const fileURL = musicArray[0].destination + '/' + musicArray[0].filename;
    const imageURL = imageArray[0].destination + '/' + imageArray[0].filename;
    try {
      var ids = new Array();
      var count = 0;
      while (count < req.body.artist.length) {
        const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
        if (ourArtist) {
          ids[count] = ourArtist._id;
        }
        count++;
      }
  
      let updatedTrack = await Track.updateOne( { _id: req.params.trackId }, 
        { 
          name: req.body.name,
          url: fileURL,
          artists: ids,
          genre: req.body.genre,   
          imageURL: imageURL
        });
      return res.status(200).json(updatedTrack);
    } catch (err) {
     return res.status(404).json(err);
    }
  } else {
   return res.status(404).json({ message: "only artists can Edit songs" });
  }
};


/**
* Trackcontroller deleteTrack
*@memberof module:controllers/trackControllers
*@function deleteTrack
*@param {function} checkAuth           Function for validate authenticatation
*@param {object}  req                  Express request object
*@param {object}  res                  Express response 
*/
exports.deleteTrack = async (req, res) => {
  const decodedID = decode_id(req);
  const UserCheck = await User.findOne({ _id: decodedID });
  if (UserCheck.type == 'artist') {
    try {
      const id = req.params.trackId;
      let result = await Track.deleteOne({ id: id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ message: "only artists can delete their songs" });
  }
};

/**
* Trackcontroller getTrack
*@memberof module:controllers/trackControllers
*@function getTrack
*@param {function} checkAuth           Function for validate authenticatation
*@param {object}  req                  Express request object
*@param {object}  res                  response of track object
*/
exports.getTrack = async (req, res) => {
  try {
    let ourTrack = await Track.findOne({ _id: req.params.trackId });
    if (ourTrack) {
      mm.parseFile(ourTrack.url)
        .then(metadata => {
         return res.status(200).json({ data: metadata });
        })
        .catch(err => {
          return res.status(404).json({ error: err.message });
        });
    }
    else {
      return res.status(500).json({ message: "the song's id is wrong" });
    }
  } catch (err) {
     return res.status(500).json(err);
  }
};


//-------------------------create the "Your liked songs" playlist after user sign up----------------------------------//
/**
 * @memberof module:trackController
 * @function {createLikeSongs} to create any empty "yourLikedSongs" Library once the user signed up successfully
 * @param {objectId} userId user that we want to create "yourLikedSongs" playlist for
 *
 */
exports.createLikedSongs = async function (userId) {
  let tracksTemp = [];
  const yourLikedSongs = new YourLikedSongs({
    tracks: tracksTemp,
    user: userId
  });
  yourLikedSongs.save()

}
//------------------Like a track---------------------//
/**
 * @memberof module:trackController
 * @function {likeSong} save a track in "yourLikeSongs" playlist for certain user
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.body.id} id trackId that user want to save it
 */
exports.likeSong = async function (req, res) {

  let trackToLike = req.body.id;
  if (!trackToLike) return res.status(404).send({ message: "trackId haven't been sent in the request" })
  let userOID=getOID(req);
  

    
    let tracksTemp = await Track.findOne({ id: req.body.id }, { trackId: '_id' })
    
    await YourLikedSongs.findOneAndUpdate({ user: userOID }, { $addToSet: { 'tracks': tracksTemp._id } });
    await YourLikedSongs.updateOne({user:userOID},{$inc:{likedTracks:1}})
    return res.status(201).json({ message: 'OK' })
  
}
//----------------------Remove track from your liked songs---------------//
/**
 * @memberof module:trackController
 * @function {dislikeSong} remove a track from "yourLikeSongs" playlist for certain user
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.body.id} id trackId that user want to remove it
 */
exports.dislikeSong = async function (req, res) {


    if (!req.body.id) return res.status(404).send({ msg: "trackId haven't been sent in the request" })
    let userOID=getOID(req);  
    let tracksTemp = await Track.findOne({ id: req.body.id }, { trackId: '_id' })

    //remove the trcak from YourLikedSongs Playlist
    await YourLikedSongs.updateOne({ user: userOID}, { $pull: { tracks: tracksTemp._id } });
    //decrement the number of liked songs by 1
    await YourLikedSongs.updateOne({user:userOID},{$inc:{likedTracks:-1}})
    return res.status(200).json({ "message": 'Deleted Successfully' })
  
}
/**
 * @memberof module:trackController
 * @function {getlikedSong} get tracks in "yourLikeSongs" playlist for certain user
 * @param {req.headers.authorization} token to get objectId of the user from
 */
//----------------------Get Liked Song Library--------------//////
exports.getlikedSong = async function (req, res) {

    let offset=req.query.offset;
    let limit=req.query.limit;

    if(!offset) offset=0;
    else offset=parseInt(offset)

    if(!limit) limit=20;
    else limit=parseInt(limit)

    let userOID=getOID(req);
    let tracksTemp = await YourLikedSongs.findOne({ user: userOID}, { 'tracks': {"$slice":[Math.abs(offset),Math.abs(limit)]}, '_id': 0 })
                                          .populate({path:'tracks', select:'name image url previewUrl id artists -_id',
                                          populate:{path:'artists',select:'name id type _id'}})
                      
  
    return res.status(200).json({ tracksTemp:tracksTemp.tracks,totalTracks:tracksTemp.likedTracks })
  
}

/**
 * @memberof module:trackController
 * @function {showByGenre} get tracks of requested genre for user
 * @param {req.params.genre} genre to get the tracks of that genre
 */
//----------------------Get tracks of the requested genre--------------//////
exports.showByGenre = async (req, res) => {
  //console.log(req.params.id)
  let reqGenre = req.params.genre;
  console.log(reqGenre);
  let result = await Track.find({ genre: reqGenre })
  if (result.length == 0)
    res.send({ message: "There's no such tracks for that genre" })
  else
    res.send(result)
};