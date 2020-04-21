/**
 * @module trackController
 */

const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Track} = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();


//-------------------------create the "Your liked songs" playlist after user sign up----------------------------------//
/**
 * @memberof module:trackController
 * @function {createLikeSongs} to create any empty "yourLikedSongs" Library once the user signed up successfully
 * @param {objectId} userId user that we want to create "yourLikedSongs" playlist for
 *
 */
exports.createLikedSongs =async function (userId)
{
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

 //-----------------------------Like a track-------------------------//   
/*exports.likeSong=async function(req,res){

    
    if(!req.body.id) return res.status(404).send({ message: "trackId haven't been sent in the request" })
    console.log(req.body.id)
    const token = req.headers.authorization.split(" ")[1];
    if(token){  

          const decoded = jwt.decode(token);
          let tracksTemp=await Track.findOne({id:req.body.id},{trackId:'_id'})
          console.log(tracksTemp)
          await YourLikedSongs.findOneAndUpdate({ user:decoded._id},{$addToSet:{'tracks':tracksTemp._id}});
          return res.status(201).json({"message" :'OK'})
    }
}
//----------------------Remove track from your liked songs---------------//
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
}*/
