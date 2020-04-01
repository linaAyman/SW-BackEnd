const mongoose = require('mongoose')
const Joi = require('joi')
const Track=require('./Track')
const User=require('./User')



const yourLikedSongsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId ,
         required:true,
         ref:'User'
    },
    tracks:[{
        trackId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Track',
        //required : true
        },
    addedAt:{
        type:Date,
        default:Date.now
    },
    }],
    type:{
        type:String,
        default:"liked songs"
    }

})
//this validation needs to be revised later

function validateLikedSongs (likedItem) {
    const schema = {
        user:Joi.required(),
        //tracks : Joi.required()
    }
  
    return Joi.validate(likedItem, schema)
  }

const YourLikedSongs = mongoose.model("YourLikedSongs", yourLikedSongsSchema )

exports.validateLikedSongs=validateLikedSongs
exports.YourLikedSongs =YourLikedSongs   


