const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const Track = require('../models/Track')
const {YourLikedSongs}=require('../models/YourLikedSongs')
const {Notification}=require('../models/Notification')
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
exports.createNotification =async function (userId)
{
    console.log("Notification document Created.")
    let notificationsTemp=[];
    const notification = new Notification ({
          user: userId,
          notifications:notificationsTemp
    });
    notification.save()

}