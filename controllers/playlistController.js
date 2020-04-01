const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Playlist} = require('../models/Playlist')
const env = require('dotenv').config();
const { Track }=require('../models/Track')
const jwt = require("jsonwebtoken");

exports.getPlaylist = async (req, res)=> {
    console.log(req.params.id)
    let playlist = await Playlist.find({id: req.params.id})
     res.send(playlist)
  
};
exports.addTrack= async function(req,res){

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    let dID = decoded._id;
    let query = req.baseUrl;
    let temp = query.substr(11,query.length-2);
    let playlistOwner = await Playlist.find({id:temp},{'_id':0, 'owner':1});
    let playlistOwnerId = (playlistOwner[0].owner._id);
    
  
      if(dID == playlistOwnerId )
        {
      
        let inputUris = req.query.uris;
        let uriArray = inputUris.split(",")
        let playlistId = await Playlist.find({id:temp},{'_id':1});
        
        uriArray.forEach(async function (value,index){
          let searchResult = await Track.findOne({uri:uriArray[index]},{'_id':1})
          console.log(uriArray[index])   
          console.log(searchResult)   
          if(searchResult){
            await Playlist
              .updateOne({objectId:playlistId,$push:{'tracks':searchResult}  });
          }
      });
        
      //return res.send(Playlist)
      return res.sendStatus(201);
      //return res.status(201);
    } else{
  
      return res.sendStatus(403);
    }
   
  
  } 
