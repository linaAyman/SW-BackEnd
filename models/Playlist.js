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
    href: {
        type: String,
    },
    type: {
        type: String,
        default: "playlist"
    },
    uri: {
        type: String,
    },
    images: [{height: Number, url: String, width: Number}],
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
        type: new mongoose.Schema({
            diplay_name: String,
            href: String,
            id: String,
            type: String,
            uri: String,
            external_urls:{
                type:new mongoose.Schema({
                    spotify :{
                        type :String,
                       // required:true
                    }
                }
                )
            }
        }),
        required: true
    },
    snapshot_id: {
        type: String
    },
    tracks: {
        type: new mongoose.Schema({
            href: String,
            total: Number,
            items: [{total: Number}]
        })
    },
    genres: [String]
})

//TODO: validation function
//const Playlist = mongoose.model('Playlist', playlistSchema)
const Playlist = mongoose.model('Playlist', playlistSchema )

exports.Playlist = Playlist
//exports.validatePlaylist = validatePlaylist