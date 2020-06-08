const mongoose = require('mongoose')
const Joi = require('joi')

const albumSchema = new mongoose.Schema({
    name: {
      type: String,
      text:true
    },
    artists:[{
        type: mongoose.Schema.Types.ObjectId , 
        required:true,ref:'Artist'
    }],
    albumType: {
      type: String,
      required: true
    },
    id:{
        type:String
    },
    external_ids:{
        type:new mongoose.Schema({
            upc :{
                type :String,
           
            }
        }
        )
    },
    external_urls:{
  
        key:{
          type: String,
          default: 'Maestro'
        },
        value:{
          type: String,

        }
    },
    href:{
        type:String,
    
    },
    type:{
        type:String,
        default:"album"

    },
    uri:{
        type:String,
        
    },
    images:
    [{
        type: Object
    
    }],
    popularity:{
        type:Number
    },
    genre:[{
    
        type: String  
    }],
    total_tracks:{
        type:Number,
        required:true
    },
    release_date:{
        type:Date,
        default:Date.now
    },
    release_date_precision:{
        type:String
    },
    tracks:[
        {type: mongoose.Schema.Types.ObjectId , required:true,ref:'Track'}
    ],
    label:{
        type:String
    }

})

const Album= mongoose.model('Album',albumSchema);
exports.Album= Album ;