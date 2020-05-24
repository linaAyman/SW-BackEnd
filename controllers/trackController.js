/**
 * @module trackController
 */

const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const Track = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();
var randomHash = require('random-key');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mm = require('music-metadata');
const util = require('util');


/**here we just upload solo songs and assume that the artist's names are unique*/
exports.uploadSong = async (req, res) => {
    const fileURL = req.file.destination + '/' + req.file.filename;
    var count = 0;
  
    try {
      let ourTrack = await Track.find({ url: fileURL });
      if (ourTrack.length >= 1) {
        res.status(404).json({ message: "The song exists before" });
      }
      else {
        var ids = new Array();
        while (count < req.body.artist.length) {
          const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
          if (ourArtist)
            ids[count] = ourArtist.id;
          count++;
        }
        try {
          const track = new Track({
            id: randomHash.generate(30),
            name: req.body.name,
            url: fileURL,
            artists: ids,
            genre: req.body.genre
          });
  
          getAudioDurationInSeconds(track.url).then((duration) => {
            track.duration = duration * 1000;// to be in miliseconds
          });
          track.external_urls.value = 'https://open.Maestro.com/tracks' + track.id;
          track.uri = 'Maestro:track:' + track.id;
          track.href = 'https://api.Maestro.com/v1/tracks/' + track.id;
  
  
          let newTrack = await track.save();
          res.status(200).json({ data: newTrack });
        } catch (err) {
          res.status(404).json({ error: err });
        }
  
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  exports.deleteTrack = async (req, res) => {
    try {
      const id = req.params.trackId;
      let result = await Track.deleteOne({ id: id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.getTrack = async (req, res) => {
    try {
      let ourTrack = await Track.findOne({ id: req.params.trackId });
      if (ourTrack) {
        mm.parseFile(ourTrack.url)
          .then(metadata => {
            console.log(util.inspect(metadata, { showHidden: false, depth: null }));
            res.status(200).json({ data: metadata });
          })
          .catch(err => {
            res.status(404).json({ error: err.message });
          });
  
      }
      else {
        res.status(500).json({ message: "the song id is wrong" });
  
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.editTrack = async (req, res) => {
    try {
      var ids = new Array();
      var count = 0;
      while (count < req.body.artist.length) {
        const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
        if (ourArtist) {
          ids[count] = ourArtist.id;
        }
        count++;
      }
      const fileURL = req.file.destination + '/' + req.file.filename;
      let updatedTrack = await Track.updateOne({ id: req.params.trackId }, { name: req.body.name, url: fileURL, artists: ids, genre: req.body.genre });
      res.status(200).json(updatedTrack);
    } catch (err) {
      res.status(404).json(err);
    }
  };
  
  
  
//-------------------------create the "Your liked songs" playlist after user sign up----------------------------------//
/**
 * @memberof module:trackController
 * @function {createLikeSongs} to create any empty "yourLikedSongs" Library once the user signed up successfully
 * @param {objectId} userId user that we want to create "yourLikedSongs" playlist for
 *
 */
exports.createLikedSongs =async function (userId)
{
    console.log("GGGGGGGGGGGGGGGGGGGGGGQQQQQQQQQQQQQQQQQQQQWWWWWWWWWWWWWW")
    let tracksTemp=[];
    const yourLikedSongs = new YourLikedSongs ({
            tracks:tracksTemp,
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
exports.likeSong=async function(req,res){

    let trackToLike=req.body.id;
    if(!trackToLike) return res.status(404).send({ message: "trackId haven't been sent in the request" })
   
    const token = req.headers.authorization.split(" ")[1];
    if(token){  

          const decoded = jwt.decode(token);
          let tracksTemp=await Track.findOne({id:req.body.id},{trackId:'_id'})
          console.log(tracksTemp)
          await YourLikedSongs.findOneAndUpdate({ user:decoded._id},{$addToSet:{'tracks':tracksTemp._id}});
          return res.status(201).json({message :'OK'})
    }
}
//----------------------Remove track from your liked songs---------------//
/**
 * @memberof module:trackController
 * @function {dislikeSong} remove a track from "yourLikeSongs" playlist for certain user
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.body.id} id trackId that user want to remove it
 */
exports.dislikeSong=async function(req,res){

    
    if(!req.body.id) return res.status(404).send({ msg: "trackId haven't been sent in the request" })
    console.log(req.body.id)
    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let tracksTemp=await Track.findOne({id:req.body.id},{trackId:'_id'})
        
          console.log(tracksTemp)  
          await YourLikedSongs.updateOne({user:decoded._id},{$pull:{tracks:tracksTemp._id}});
          return res.status(200).json({"message" :'Deleted Successfully'})
    }
}
/**
 * @memberof module:trackController
 * @function {getlikedSong} get tracks in "yourLikeSongs" playlist for certain user
 * @param {req.headers.authorization} token to get objectId of the user from
 */
//----------------------Get Liked Song Library--------------//////
exports.getlikedSong=async function(req,res){

    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let tracksTemp=await YourLikedSongs.findOne({user:decoded._id},{'tracks':1,'_id':0}).populate('tracks','name image url previewUrl id -_id')
          return res.status(200).json({tracksTemp})
    }
}


