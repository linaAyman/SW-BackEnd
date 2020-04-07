const joi = require('joi')
const {Album} = require('../models/Album')
const env = require('dotenv').config();

exports.getAlbum = async (req, res)=> {
    console.log(req.params.id)
    let album = await Album.find({id: req.params.id},{'_id':0,'id':1,'name':1,'image':1,'label':0,'artists':1}).populate('artists','name -_id')
     res.send(album)
  
};
exports.getTracks=async(req,res)=>{
    console.log(req.params.id)
    let tracks=await Album.findOne({id:req.params.id},{_id:0,tracks:1})
    .populate({path:'tracks',select:'name duration trackNumber id artists -_id',populate:{path:'artists',select:'name -_id'}});
 
    console.log(tracks)
    return res.status(200).send(tracks)
 };
 