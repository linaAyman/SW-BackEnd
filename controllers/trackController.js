const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Track} = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();


//-------------------------create the "Your liked songs" playlist after user sign up----------------------------------//
exports.createLikedSongs =async function (userId)
{
    let tracksTemp=[];
    const yourLikedSongs = new YourLikedSongs ({
            tracks:tracksTemp,
            user: userId
    });
    yourLikedSongs.save()

}
 //-----------------------------Like a track-------------------------//   
exports.likeSong=async function(req,res){

    
    if(!req.body.id) return res.status(404).send({ message: "trackId haven't been sent in the request" })
    console.log(req.body.id)
    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let tracksTemp=await Track.find({id:req.body.id},{track:'_id'})
          
          console.log(tracksTemp)
          await YourLikedSongs.findOneAndUpdate({ user:decoded._id},{$addToSet:{'tracks':tracksTemp}});
          return res.status(201).json({"message" :'OK'})
    }
}
//----------------------Remove track from your liked songs---------------//
exports.dislikeSong=async function(req,res){

    console.log("HEYYY")
    if(!req.body.id) return res.status(404).send({ msg: "trackId haven't been sent in the request" })
    console.log(req.body.id)
    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let tracksTemp=await Track.find({id:req.body.id},{track:'_id'})
        

          await YourLikedSongs.updateOne({user:decoded._id},{$pull:{'tracks':{_id:tracksTemp}}});
          return res.status(200).json({"message" :'Deleted Successfully'})
    }
}
