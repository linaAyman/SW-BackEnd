/**
 * @module albumController
 */

const joi = require('joi')
const {Album} = require('../models/Album')
const env = require('dotenv').config();
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
 