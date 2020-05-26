const Joi = require('joi')
const Artist=require('./Artist')
const mongoose = require('mongoose')


const trackSchema = new mongoose.Schema({
   artists:[{
        type : mongoose.Schema.Types.ObjectId 
       ,ref:'Artist'
    }],
    Album:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'Album',
      
    },
    duration:{
        type:Number,
    },
    url:{
        type :String
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
    id:{
        type: String
  
    },
    name:{
        type :String,
         text:true
      
    },
    type:{
        type:String,
        default:"track"

    },
    uri:{
        type:String,
     
    },
    explicit:{
       type: Boolean,
       default:false

    },
    preview_url:{
       type: String    
    },

    music:{
        type: Object
    },
    genre:{
        type: String  
    }

});
//module.exports = mongoose.model('Track', trackSchema);
const Track = mongoose.model('Track', trackSchema)

exports.Track = Track
