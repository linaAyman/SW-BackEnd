

const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Track} = require('../models/Track')
const {Library}=require('../models/Library')
const {Album}=require('../models/Album')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();
const getOID=require('../middleware/getOID')



/**
 * @memberof module:libraryController
 * @function {createLibrary} create library object for current logged in user
 * @param {userId} objectID of user
 * 
*/

exports.createLibrary =async function (userId)
{
    
    let Temp=[];
    const library = new Library ({
            playlists:Temp,
            albums:Temp,
            user: userId
    });
    await library.save()

}
/**
 * @memberof module:libraryController
 * @function {getLikedAlbums} get albums in the library for current logged in user
 * @param {req.header.Authorization} token of current logged in user
 * @returns {likedAlbums} array of albums 
 * @returns {totalAlbums} count of albums in library
*/
exports.getLikedAlbums=async function(req,res){
    const userId=getOID(req);
    let offset=req.query.offset;
    let limit=req.query.limit;

    if(!offset) offset=0;
    else offset=parseInt(offset)

    if(!limit) limit=20;
    else limit=parseInt(limit)
      let likedAlbums = await Library.findOne({user: userId}, {'albums':{"$slice":[Math.abs(offset),Math.abs(limit)]},'_id':0})
                                            .populate({path:'albums',select:'artists name image id type -_id',
                                             populate:{path:'artists',select:'name id -_id'}});
                                            
    let totalAlbums=await Library.findOne({user:userId},{'albumsCount':1,'_id':0});
    return res.status(200).json({albums:likedAlbums.albums , totalAlbums:totalAlbums.albumsCount})
    
}
/**
 * @memberof module:libraryController
 * @function {getLikedPlaylists} get playlists in the library for current logged in user
 * @param {req.header.Authorization} token of current logged in user
 * @returns {likedPlaylists} array of playlists
 * @returns{totalPlaylists} count of playlists in library
*/

exports.getLikedPlaylists=async function(req,res){
     const userId=getOID(req);
     let offset=req.query.offset;
     let limit=req.query.limit;

     if(!offset) offset=0;
     else offset=parseInt(offset)

      if(!limit) limit=20;
      else limit=parseInt(limit)
      let likedPlaylists = await Library.findOne({user: userId}, {'playlists':{"$slice":[Math.abs(offset),Math.abs(limit)]},'_id':0})
                                            .populate({path:'playlists',select:'name owner description image id type -_id',
                                             populate:{path:'owner',select:'name _id'}});
                                            
    let totalPlaylists=await Library.findOne({user:userId},{'playlistsCount':1,'_id':0});
    return res.status(200).json({playlists:likedPlaylists.playlists , totalPlaylists:totalPlaylists.playlistsCount})
    
}
