const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Playlist} = require('../models/Playlist')
const env = require('dotenv').config();

exports.getPlaylist = async (req, res)=> {
    console.log(req.params.id)
    let playlist = await Playlist.find({id: req.params.id})
     res.send(playlist)
  
};
exports.getAllTracks=async(req,res)=>{
    let tracks=await Playlist.findOne({id:req.params.id},{'tracks':1,'_id':0})
                             .populate({path:'tracks',select:'name image id artists previewUrl url-_id',populate:{path:'artists',select:'name id -_id'}});

    console.log(tracks)
    return res.status(200).send(tracks)
};