const mongoose = require('mongoose')
const Joi = require('joi')
// const Track=require('./Track')
// const User=require('./User')
// const Playlist=require('./Playlist')
// const Album=require('./Album')
// const Artist=require('./')



const librarySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId ,
         required:true,
         ref:'User'
    },
    playlists:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Playlist'
        //required : true
        
    }],
    albums:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Album'
    }],
    // likedSongs:{
    //     type: mongoose.Schema.Types.ObjectId ,
    //      required:true,
    //      ref:'YourLikedSongs'
    // },
    type:{
        type:String,
        default:"library"
    }

})
//this validation needs to be revised later

function validateLibrary (library) {
    const schema = {
        user:Joi.required(),
        playlists:Joi.required(),
        likedSongs:Joi.required(),
        albums:Joi.required()
    }
  
    return Joi.validate(library, schema)
  }

const Library = mongoose.model("Library", librarySchema )

exports.validateLibrary=validateLibrary
exports.Library =Library   


