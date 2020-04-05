const joi = require('joi')
const {Album} = require('../models/Album')
const env = require('dotenv').config();

exports.getAlbum = async (req, res)=> {
    console.log(req.params.id)
    let album = await Album.find({id: req.params.id})
     res.send(album)
  
};