const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Playlist} = require('../models/Playlist')
const env = require('dotenv').config();
const { Track }=require('../models/Track')
const jwt = require("jsonwebtoken");
const dot = require('dot-object');


exports.getPlaylist = async (req, res)=> {
    console.log(req.params.id)
    let playlist = await Playlist.find({id: req.params.id},{'name':1,'_id':0,'image':1,'id':1})
     res.send(playlist)
  
};
exports.getAllTracks=async(req,res)=>{
    let tracks=await Playlist.findOne({id:req.params.id},{'tracks':1,'_id':0})
                             .populate({path:'tracks',select:'name image id artists previewUrl url-_id',
                              populate:{path:'artists',select:'name id -_id'}});

    console.log(tracks)
    return res.status(200).send(tracks)
};
exports.addTrack= async function(req,res){

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    let dID = decoded._id;
   /* const token1 = jwt.sign(
      { _id:  "5e848bf8da28c351f47c1ec8" ,
        name: "Ayleeeeeeen 21 ", 
      },
      process.env.JWTSECRET,
      {
        expiresIn: '7d'
      }
    );
    res.send(token1)
    console.log(token1)*/
    let query = req.baseUrl;
    let temp = query.substr(11,query.length-2);
  try
  {
    let playlistOwner = await Playlist.find({id:temp},{'_id':0, 'owner':1});
    let playlistOwnerId = (playlistOwner[0].owner);
    let trackCount = await Playlist.find({id:temp},{'_id':0,'totalTracks':1},);
    let totalTracks = trackCount[0].totalTracks+1;
   
    if(dID == playlistOwnerId )
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
