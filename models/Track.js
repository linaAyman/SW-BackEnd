const Joi = require('joi')
const Artist=require('./Artist')
const mongoose = require('mongoose')


const trackSchema = new mongoose.Schema({
    artists:[{type: mongoose.Schema.Types.ObjectId , required:true,ref:'Artist'}],
    
    duration_ms:{
        type:Number,
       // required:true
    },
    external_urls:{
        type:new mongoose.Schema({
            spotify :{
                type :String,
               // required:true
            }
        }
        )
    },
    href:{
        type:String,
       // required:true
    },
    id:{
        type:String,
        required:true,
        //unique:true
    },
    name:{
        type :String,
        text:true,
        required:true
    },
    track_number:{  
        type :Number,
        //required:true
    },
    type:{
        type:String,
        default:"track"

    },
    uri:{
        type:String,
        //required:true
    }

    
})


const Track = mongoose.model('Track', trackSchema)

function validateTrack (track) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(15)
      .required(),
  }

  return Joi.validate(track, schema)
}

exports.Track = Track
exports.validateTrack = validateTrack