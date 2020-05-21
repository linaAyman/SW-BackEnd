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
    external_urls:{
        type: new mongoose.Schema({
            spotify: {
                type: String,
            }
        }
        )
    },
  
    type: {
        type: String,
        default: "playlist"
    },
    uri: {
        type: String,
    },
    images: { url: String},
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
    },
        
    //tracks:{
   
        
    /*added_at:{type:Date, default:Date.now}
        ,
    total: {
            type: Number
        }*/
  //  },
    genres: [String]
})

//TODO: validation function
//const Playlist = mongoose.model('Playlist', playlistSchema)
const Playlist = mongoose.model('Playlist', playlistSchema )

exports.Playlist = Playlist