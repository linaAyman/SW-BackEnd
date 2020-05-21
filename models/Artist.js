const mongoose = require('mongoose')
const Joi = require('joi')

const artistSchema = new mongoose.Schema({
    name: {
      type: String
    },
    id: {
      type:  String,
   
    },
    external_urls:{
        type:new mongoose.Schema({
            spotify :{
                type :String,
               
            }
        }
        )
    },
    href:{
        type:String,
    
    },
    type:{
        type:String,
        default:"artist"

    },
    uri:{
        type:String,
        
    },
    images:[{height:Number,url:String,width:Number}],
    popularity:{
        type:Number
    },
    genres:[String]

})
module.exports = mongoose.model('Artist',artistSchema);

