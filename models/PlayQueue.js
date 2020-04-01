const mongoose = require('mongoose')
const Joi = require('joi')

const playQueueSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId , 
        required:true,
        ref:'User'
    },
    repeatState: {
        type  : boolean,
        default :false,
        required : true
    },
    shuffleState: {
        type: boolean,
        default:true,
        required: true
    },
    Context:{
        type: new mongoose.Schema({
            type:{
                type : String,
                required:true,
            },
            uri:{
                type : String
            },
            externalUrl:{
                type : String
            }
        }),
        required : true
    },
    CurrentlyPlayingType: {
        type: String,
        default:"track",
        required:true
    },
    itemPlaying: {
        type: mongoose.Schema.Types.ObjectId , 
        required:true,
        ref:'Track'
    },
    actions:{
        pause:{
            type : String,
            default : true
        },
        resume:{
            type : String,
            default : true
        },
        skipNext:{
            type : String,
            default : true
        },
        skipPrev:{
            type : String,
            default : false
        },
        repeat:{
            type : String,
            default : false
        },
        shuffle:{
            type : String,
            default : false
        }
    }
})
function validatePlayQueue (playQueue) {
    const schema = {
      userId: Joi.required().ObjectId(),
      Context:Joi.required(),
      itemPlaying:Joi.required().String(),
      CurrentlyPlayingType:Joi.required()
    }
    return Joi.validate(playQueue, schema)
  }
  

const PlayQueue = mongoose.model('PlayQueue', playQueueSchema )

exports.validatePlayQueue=validatePlayQueue
exports.PlayQueue = PlayQueue;