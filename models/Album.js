const mongoose = require('mongoose')
const Joi = require('joi')

const albumSchema = new mongoose.Schema({
    name: {
      type: String,
      text:true
    },
    artists:[{type: mongoose.Schema.Types.ObjectId , required:true,ref:'Artist'}],
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
               // required:true
            }
        }
        )
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
    type:{
        type:String,
        default:"album"

    },
    uri:{
        type:String,
        //required:true
    },
    images:[{height:Number,url:String,width:Number}],
    popularity:{
        type:Number
    },
    genres:[String],
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
//this validation needs to be revised later
    function validateAlbum (album) {
        const schema = {
          name: Joi.string()
            .max(40)
            .required()
        }
      
        return Joi.validate(album, schema)
      }

      const Album = mongoose.model('Album', albumSchema)

      exports.Album = Album
      exports.validateAlbum = validateAlbum