const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const Track = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
const {Notification}=require('../models/Notification')
const {Playlist}=require('../models/Playlist')
const User = require('../models/User')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();
var randomHash = require('random-key');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mm = require('music-metadata');
const util = require('util');

//-------------------------create the Notifications module after user sign up----------------------------------//
/**
 * @memberof module:notificationController
 * @function {createNotification} to create any empty "createNotification" Library once the user signed up successfully
 * @param {objectId} userId user that we want to create "createNotification"  for viewing user's notifications
 *
 */
async function createNotification (userId)
{
    console.log("Notification document Created.")
    let notificationsTemp=[];
    const notification = new Notification ({
          user: userId,
          notifications:notificationsTemp
    });
    notification.save()
}
exports.CreateNewNotification = createNotification
//-------------------------Push a Like Playlist Notification to the users database ----------------------------------//
/**
 * @memberof module:notificationController
 * @function {addLikeNotification} to add new notification "addNotification" 
 * @param {objectId} PlaylistId user that we want to add a "addLikeNotification"  in his database
 * @param {objectId} userId the ID of the user the liked the playlist 
 * Which means that a user has liked his playlist
 */
exports.addLikeNotification =async function (PlaylistId,userId){
    let OwnerID =await Playlist.findOne({_id:PlaylistId},{owner:1})
    let PID =await Playlist.findOne({_id:PlaylistId},{id:1,_id:0})
    let UserName = await User.find({_id:userId},{name:1})
    let notificationStatement = UserName[0].name+" has liked your playlist with id "+PID.id
    await Notification.updateOne({user:OwnerID.owner},{$push:{notifications:{$each:[notificationStatement],$position:0}}})

    
}
//-------------------------Push a follow Notification to the users database ----------------------------------//
/**
 * @memberof module:notificationController
 * @function {addFollowNotification} to add new notification "addNotification" 
 * @param {objectId} followeruserId the ID of the user that followed the artist
 * @param {objectId} followedId the ID of the artist that have been followed
 * Which means that a user has liked his playlist
 */
exports.addFollowNotification =async function (followeruserId,followedArtistId){
    let UserName = await User.find({_id:followeruserId},{name:1})
    let notificationStatement = UserName[0].name+" has followed you ";
    let temp = await Notification.find({user:followedArtistId},{_id:1})
    console.log("temp"+temp)
    console.log("artist to follow"+followedArtistId)
    await Notification.updateOne({user:followedArtistId},{$push:{notifications:{$each:[notificationStatement],$position:0}}})
    
}