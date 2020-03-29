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