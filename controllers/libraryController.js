

const mongoose = require('mongoose')
const config = require('config')
const joi = require('joi')
const {Track} = require('../models/Track')
const {Library}=require('../models/Library')
var jwt = require('jsonwebtoken')
const env = require('dotenv').config();


exports.createLibrary =async function (userId)
{
    console.log("HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYs")
    let Temp=[];
    const library = new Library ({
            playlists:Temp,
            albums:Temp,
            user: userId
    });
    console.log(library);
    await library.save()

}