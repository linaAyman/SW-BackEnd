const mongoose = require('mongoose')
const Joi = require('joi')

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
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
        type: new mongoose.Schema({
            href: {
                type: String
            },
            total: {
                type: Number
            }
        })
    },
    description: {
        type: String
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId, ref:'User'
        ,
        required: true
    },
    tracks:[{
        type: new mongoose.Schema({
         id: {type:mongoose.Schema.Types.ObjectId,ref:'Track'}
        ,
        added_at:{type:Date, default:Date.now}
        })
    }],
    genres: [String]
})

//TODO: validation function
//const Playlist = mongoose.model('Playlist', playlistSchema)
const Playlist = mongoose.model('Playlist', playlistSchema )

exports.Playlist = Playlist
//exports.validatePlaylist = validatePlaylist