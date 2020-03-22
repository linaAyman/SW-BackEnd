const mongoose = require('mongoose');
//const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
   
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 128,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 80
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
   birthDate:{
      type: Date,
      required: true,
      default: Date.now
    },

    gender:{
      type: String,
      required: true
    },
    followersCount: { 
      type: Number, 
      default: 0
    },
    isPremium :{
      type: Boolean,
      default: false
    }
   /*image:{
      type: String, 
      default: url + 'public/profileImage/' + config.get('default')
    }*/
  
});


module.exports= mongoose.model('User', userSchema)


 
