/**
 * @module albumController
 */
const {Album} = require('../models/Album')
const {Library}=require('../models/Library')
const env = require('dotenv').config();
const Joi = require('joi');
const { Track } = require('../models/Track');
var randomHash = require('random-key');
const {Artist} = require('../models/Artist');
const mm = require('music-metadata');
const util = require('util');
const User = require('../models/User');
const decode_id = require('../middleware/getOID');


function Validate(req) {
   const schema = {
     genre:
       Joi.array().items(Joi.string().min(1).max(30)).required(),
     name:
       Joi.string().min(3).max(30).required(),
     artist:
       Joi.array().items(Joi.string().min(1).max(30)).required(),
     music:
       Joi.required(),
     image:
       Joi.required(),
     albumType:
       Joi.string().valid("album", "single", "compilation").required()
   }
   return Joi.validate(req, schema);
 };
 exports.validateSong = Validate;
 
 exports.addAlbum = async (req, res) => {
   const decodedID = decode_id(req);
   const UserCheck = await User.findOne({ _id: decodedID });
   if (UserCheck.type == 'artist') {
     //First valdiate the coming data
     const { error } = Validate({
       genre: req.body.genre,
       name: req.body.name,
       artist: req.body.artist,
       music: req.files['music'],
       image: req.files['image'],
       albumType: req.body.type
     })
     if (error) {
       return res.status(400).send({ message: error.details[0].message });
     }
     try {
       // loop  over each entered track to save in the database and save its url in album
       var i = 0;
       const ids = new Array();
       const musicArray = req.files['music'];
       const imageArray = req.files['image'];
       const imageUrls = [];
       const trackIDs = [];
       const genres = req.body.genre;
       const numTracks = Object.keys(musicArray).length;
       const numImages = Object.keys(imageArray).length;
       //multer check that the coming data is .jpg or .mp3 only so we have to check that he/she puts the correct format for images and music
       while (i < numImages) {
         if (imageArray[i].destination != "./images") {
           return res.status(400).send({ message: "You should enter correct format in image" });
         }
         i++;
       };
       i = 0;
       while (i < numTracks) {
         if (musicArray[0].destination != "./uploads") {
           return res.status(400).send({ message: "You should enter correct format in music" });
         }
         i++;
       };
       i = 0;
       //we save the urls of all images
       while (i < numImages) {
         const imageURL = imageArray[i].destination + '/' + imageArray[i].filename;
         imageUrls[i] = imageURL;
         i++;
       };
       i = 0;
       // here we assume that we will store always the first image and first genre of album in all tracks then the artist can edit it
       while (i < numTracks) {
 
         const fileURL = musicArray[i].destination + '/' + musicArray[i].filename;
         const imageURL_0 = imageArray[0].destination + '/' + imageArray[0].filename;
 
         var count = 0;
 
         try {
           let ourTrack = await Track.find({ url: fileURL });
           if (ourTrack.length >= 1) {
             return res.status(404).json({ message: "The song exists before" });
           }
           else {
             while (count < req.body.artist.length) {
               const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
               if (ourArtist) {
                 ids[count] = ourArtist._id;
               }
               count++;
             }
 
             try {
               const track = new Track({
                 id: randomHash.generate(30),
                 name: musicArray[i].filename,
                 url: fileURL,
                 artists: ids,
                 imageURL: imageURL_0,
                 genre: genres[0],
                 AlbumName: req.body.name
               });
 
               trackIDs[i] = track._id;
               track.external_urls.value = 'https://open.Maestro.com/tracks' + track.id;
               track.uri = 'Maestro:track:' + track.id;
               track.href = 'https://api.Maestro.com/v1/tracks/' + track.id;
               let newTrack = await track.save();
             } catch (err) {
               return res.status(500).json({ error: err });
             }
 
           }
         } catch (err) {
           return res.status(400).json({ error: err });
         }
         i++;
       }
       // after entering each track we made new object album 
       const album = new Album({
         name: req.body.name,
         artists: ids,
         id: randomHash.generate(30),
         images: imageUrls,
         genre: genres,
         total_tracks: numTracks,
         tracks: trackIDs,
         albumType: req.body.type
       });
       album.external_urls.value = 'https://open.Maestro.com/albums' + album.id;
       album.uri = 'Maestro:album:' + album.id;
       album.href = 'https://api.Maestro.com/v1/albums/' + album.id;
       let newAlbum = await album.save();
       res.status(200).json({ message: "Album uploaded successfully" });
     } catch (err) {
       return res.status(500).json({ error: err });
     }
   } else {
     return res.status(404).json({ message: "only Artists can upload albums" });
   }
 };
 
 
 exports.editAlbum = async (req, res) => {
   const decodedID = decode_id(req);
   const UserCheck = await User.findOne({ _id: decodedID });
   if (UserCheck.type == 'artist') {
 
     //First valdiate the coming data
     const { error } = Validate({
       genre: req.body.genre,
       name: req.body.name,
       artist: req.body.artist,
       music: req.files['music'],
       image: req.files['image'],
       albumType: req.body.type
     })
     if (error) {
       return res.status(400).send({ message: error.details[0].message });
     }
     try {
       const ourAlbum = await Album.findOne({ id: req.params.albumId });
       if (!ourAlbum) {
         return res.status(404).json({ message: "This id isn't exist " });
       }
       var i = 0;
       const ids = new Array();
       const musicArray = req.files['music'];
       const imageArray = req.files['image'];
       const imageUrls = [];
       const genres = req.body.genre;
       const numTracks = Object.keys(musicArray).length;
       const numImages = Object.keys(imageArray).length;
       //multer check that the coming data is .jpg or .mp3 only so we have to check that he/she puts the correct format for images and music
       while (i < numImages) {
         if (imageArray[i].destination != "./images") {
           return res.status(400).send({ message: "You should enter correct format in image" });
         }
         i++;
       };
       i = 0;
       while (i < numTracks) {
         if (musicArray[0].destination != "./uploads") {
           return res.status(400).send({ message: "You should enter correct format in music" });
         }
         i++;
       };
       i = 0;
       //we save the urls of all images
       while (i < numImages) {
         const imageURL = imageArray[i].destination + '/' + imageArray[i].filename;
         imageUrls[i] = imageURL;
         i++;
       };
       i = 0;
       // here we assume that we will store always the first image and first genre of album in all tracks then the artist can edit it
       while (i < numTracks) {
         const fileURL = musicArray[i].destination + '/' + musicArray[i].filename;
         const imageURL_0 = imageArray[0].destination + '/' + imageArray[0].filename;
         var count = 0;
         try {
           while (count < req.body.artist.length) {
             const ourArtist = await Artist.findOne({ name: req.body.artist[count] });
             if (ourArtist) {
               ids[count] = ourArtist._id;
             }
             count++;
           }
           try {
             let updatedTrack = await Track.updateOne({ url: fileURL },
               {
                 artists: ids,
                 genre: genres[0],
                 imageURL: imageURL_0,
                 AlbumName: req.body.name
               });
           } catch (err) {
             return res.status(500).json({ message: "this song isn't in album to edit it" });
           }
         } catch (err) {
           return res.status(400).json({ error: err });
         }
         i++;
       }
       // after entering each track we edit object album 
       let updatedAlbum = await Album.updateOne({ id: req.params.albumId },
         {
           name: req.body.name,
           artists: ids,
           images: imageUrls,
           genre: genres,
           total_tracks: numTracks,
           albumType: req.body.type
         });
 
       res.status(200).json(updatedAlbum);
     } catch (err) {
       return res.status(500).json({ error: err });
     }
   } else {
     return res.status(404).json({ message: "only Artists can upload albums" });
   }
 };
 
 exports.deleteAlbum = async (req, res) => {
   const decodedID = decode_id(req);
   const UserCheck = await User.findOne({ _id: decodedID });
   if (UserCheck.type == 'artist') {
     try {
       const ourAlbum = await Album.findOne({ id: req.params.albumId });
       if (ourAlbum) {
         var i = 0;
         const numTracks = Object.keys(ourAlbum.tracks).length;
         while (i < numTracks) {
           try {
             let resultTrack = await Track.deleteOne({ _id: ourAlbum.tracks[i] });
           } catch (err) {
             return res.status(404).json({ error: err });
           }
           i++;
         }
         try {
           let resultAlbum = await Album.deleteOne({ id: req.params.albumId });
           res.status(200).json({ message: "fola" });
         } catch (err) {
           return res.status(500).json({ error: err });
         }
       } else {
         res.status(404).json({ message: "the id doesn't exist" });
       }
     } catch (err) {
       res.status(500).json({ error: err });
     }
   } else {
     return res.status(404).json({ message: "only Artists can upload albums" });
   }
 };


/**
 * @async
 * @memberof module:controllers/albumController
 * @function 
 * Gets the specific Album by the sent id in the request
 * @param {URL} req - the request that calls getAlbum Function
 * @param {object} res - the response on the request sent by the function
 */
exports.getAlbum = async (req, res)=> {
    console.log(req.params.id)
    let album = await Album.find({id: req.params.id},{'_id':0,'id':1,'name':1,'image':1,'label':1,'artists':1}).populate('artists','name -_id')
     res.send(album)
  
};
/**
 * @async 
 * @function
 * Get all tracks inside an album
 * @param {URL} req -send album id
 * @param {object} res -the response on the given request
 * @returns {array} tracks - array of tracks inside album
 */
exports.getTracks=async(req,res)=>{
    console.log(req.params.id)
    let tracks=await Album.findOne({id:req.params.id},{_id:0,tracks:1})
    .populate({path:'tracks',select:'name duration trackNumber id artists -_id',populate:{path:'artists',select:'name -_id'}});
 
    console.log(tracks)
    return res.status(200).send(tracks)
 };
 /**
 * @memberof module:trackController
 * @function {likeAlbum} add an album from current user's library
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.body.id}  Id of album that user want to remove it
 */
 exports.likeAlbum=async (req,res)=>{
   console.log("LIKE ALBUM Routeddd Correctly\n");
     let albumToLike=req.body.id;
     if(!albumToLike) return res.status(404).send({ message: "albumId haven't been sent in the request" })
    
     console.log(albumToLike)
    let userId=decode_id(req);
     let albumsTemp=await Album.findOne({id:albumToLike},{'_id':1})
     console.log(albumsTemp);
    
     await Library.findOneAndUpdate({ user:userId},{ $addToSet: { 'albums': albumsTemp._id }} );
     await Library.updateOne({user:userId},{$inc:{albumsCount:1}})
     return res.status(201).json({message :'OK'})

 };
/**
 * @memberof module:trackController
 * @function {dislikeAlbum} remove an album from current user's library
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.body.id}  Id of album that user want to remove it
 */
exports.dislikeAlbum = async function (req, res) {


  if (!req.body.id) return res.status(404).send({ msg: "albumId haven't been sent in the request" })
  let userId=decode_id(req);
  
    let albumsTemp = await Album.findOne({ id: req.body.id }, { trackId: '_id' })

    console.log(albumsTemp)
    await Library.updateOne({ user: userId }, { $pull: { albums:albumsTemp._id } });
    await Library.updateOne({user:userId},{$inc:{albumsCount:-1}})
    return res.status(200).json({ "message": 'Deleted Successfully' })
  
}