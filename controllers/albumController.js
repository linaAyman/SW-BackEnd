/**
 * @module albumController
 */

const joi = require('joi')
const {Album} = require('../models/Album')
const {Library}=require('../models/Library')
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
 exports.likeAlbum=async (req,res)=>{
 

     let albumToLike=req.body.id;
     if(!albumToLike) return res.status(404).send({ message: "albumId haven't been sent in the request" })
    
     const token = req.headers.authorization.split(" ")[1];
     if(token){  
           const decoded = jwt.decode(token);
           let albumsTemp=await Album.findOne({id:req.body.id},{'_id':1})
           console.log(albumsTemp)
        //    await Library.findOneAndUpdate({ user:decoded._id},{$addToSet:{'albums':albumsTemp._id}});
           await Library.findOneAndUpdate({ user:decoded._id},{$push:{albums:{$each:[albumsTemp],$position:0}}});
        //    await Search.findOneAndUpdate({userId:decoded._id},{$push:{searchedItems:{$each:[searchedObject],$position:0}}})
           return res.status(201).json({message :'OK'})
     }

 };