const mongoose = require('mongoose')
const Joi = require('joi')

const artistSchema = new mongoose.Schema({
    name: {
      type: String
    },
   /* userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },*/
    //_id: mongoose.Schema.Types.ObjectId,
    id: {
      type: String,
      required: true
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
        default:"artist"

    },
    uri:{
        type:String,
        //required:true
    },
    images:[{height:Number,url:String,width:Number}],
    popularity:{
        type:Number
    },
    genres:[String]

})
//this validation needs to be revised later
    function validateArtist (artist) {
        const schema = {
          name: Joi.string()
            .max(40)
            .required()
        }
      
        return Joi.validate(artist, schema)
      }

      const Artist = mongoose.model('Artist', artistSchema)

      exports.Artist = Artist
      exports.validateArtist = validateArtist      


