const mongoose = require('mongoose')
const Joi = require('joi')

const playlistSchema = new mongoose.Schema({
 
    tracks:[{type: mongoose.Schema.Types.ObjectId , required:true,ref:'Track'}],
    name: {
        type: String,
        text:true,
        required: true
    },
    id: {
        type: String,
        required: true
    },

  
    type: {
        type: String,
        default: "playlist"
    },

    image:{
        type: String
    },
    popularity: {
        type: Number
    },
    followers: {
        type: Number
    },
    totalTracks: {
        type: Number
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required: true
    }
        
 
})


const Playlist = mongoose.model('Playlist', playlistSchema )

exports.Playlist = Playlist