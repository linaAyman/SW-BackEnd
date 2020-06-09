const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const Track = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
const {Notification}=require('../models/Notification')
const {Follow} = require('../models/Follow')
const {Playlist}=require('../models/Playlist')
const User = require('../models/User') 
var request = require('request');   
const getOID=require('../middleware/getOID');  

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
    var notificationsTemp=[];
    const notification = new Notification ({
          user: userId,
          notifications:notificationsTemp
    });
    notification.save()
}
exports.CreateNewNotification = createNotification

//------------------------- Push Notifications function----------------------------------//
/**
 * @memberof module:notificationController
 * @function {sendMessage} Sending push message to user when specific action occurs
 * @param {player-ID} device The ID of the user whom the messag will be sent to him
 * @param {String} message The message that will be sent to the user
 *
 */
var sendMessage = function(device, message){
	var restKey = 'ZGQwNzIwYWEtZDFhNC00Njc0LWJlOGUtZWQ4NDBjNzRlMWFk';
	var appID = 'e278f5e7-b89d-4b48-b9ee-da134b9f8e9d';
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic "+restKey,
				"content-type": "application/json"
			},
			json: true,
			body:{
				'app_id': appID,
				'contents': {en: message},
				'include_player_ids': Array.isArray(device) ? device : [device]
			}
		},
		function(error, response, body) {
			if(!body.error){
				console.log(body);
			}else{
				console.error('Error:', body.errors);
			}
			
		}
	);
}
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
    let PID =await Playlist.findOne({_id:PlaylistId},{name:1,_id:0})
    let UserName = await User.find({_id:userId},{name:1})
    let notificationStatement = UserName[0].name+" has liked your playlist: "+PID.name
    await Notification.updateOne({user:OwnerID.owner},{$push:{notifications:{$each:[notificationStatement],$position:0}}})
    sendMessage('8995e1d2-2367-41d5-a3cc-fa3d4dad92bd', notificationStatement);
    
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
    var UserName = await User.find({_id:followeruserId},{name:1})
    var notificationStatement = UserName[0].name+" has followed you ";
    var temp = await Notification.find({user:followedArtistId},{_id:1})
    console.log("temp"+temp)
    console.log("artist to follow"+followedArtistId)
    await Notification.updateOne({user:followedArtistId},{$push:{notifications:{$each:[notificationStatement],$position:0}}})
 
     sendMessage('8995e1d2-2367-41d5-a3cc-fa3d4dad92bd', notificationStatement);
    
}
//-------------------------Push a Notification That artist uploaded a song ----------------------------------//
/**
 * @memberof module:notificationController
 * @function {addUploadSongNotification} to add new notification "addNotification" 
 * @param {objectId} ArtistId the ID of the artist that added song
 * @param {String} SongName the name of the song
 * Which means that a user has liked his playlist
 */
exports.addUploadSongNotification =async function (ArtistId,SongName){
    var tempName = await User.find({_id:ArtistId},{name:1})
    var ArtistName = tempName[0].name;
    var FollowersIDArray = await Follow.find({user:ArtistId},{_id:0,followerIds:1});
    var notificationStatement = ArtistName + " has uploaded new song: "+ SongName;
    if(FollowersIDArray){
        var array = FollowersIDArray[0].followerIds
        array.forEach(async function (value,index){
            await Notification.updateOne({user:(array[index])},{$push:{notifications:{$each:[notificationStatement],$position:0}}})
        })
    }
    sendMessage('8995e1d2-2367-41d5-a3cc-fa3d4dad92bd', notificationStatement);  
    
}
//-------------------------Push a Notification That artist uploaded an album ----------------------------------//
/**
 * @memberof module:notificationController
 * @function {addUploadSongNotification} to add new notification "addNotification" 
 * @param {objectId} ArtistId the ID of the artist that added song
 * @param {String} AlbumName the name of the song
 * Which means that a user has liked his playlist
 */
exports.addUploadAlbumNotification =async function (ArtistId,AlbumName){
    var tempName = await User.find({_id:ArtistId},{name:1})
    var ArtistName = tempName[0].name;
    var FollowersIDArray = await Follow.find({user:ArtistId},{_id:0,followerIds:1});
    var notificationStatement = ArtistName + " has uploaded new album: "+ AlbumName;
    if(FollowersIDArray){
        var array = FollowersIDArray[0].followerIds
        array.forEach(async function (value,index){
            await Notification.updateOne({user:(array[index])},{$push:{notifications:{$each:[notificationStatement],$position:0}}})
        })
    }
    sendMessage('8995e1d2-2367-41d5-a3cc-fa3d4dad92bd', notificationStatement);  
    
}
//-------------------------get User's Notification----------------------------------//
/**
 * @memberof module:notificationController
 * @function {getUserNotification} to return the user's notification
 * @param req 
 * @param res 
 */
exports.getUserNotification =async function (req,res){
    const userOID = getOID(req); 
    var NotificationInfo = await Notification.find({user:userOID},{_id:0,notifications:1});
    return res.send(NotificationInfo[0])
}
