const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
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
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 birthDate:{
    type: Date,
    required: true
  },
  gender:{
    type: Boolean,
    required: true
  },
  maestroId:{
    type: String ,
    default: null
  },
  followersCount: { 
    type: Number, 
    default: 0
  },
  isPremium :{
    type: Boolean,
    default: false
  },
  image:{
   data: Buffer,
   contentType: String
  },
  providInfo:{
    type: Boolean,
    default: false
  },
  country:{
    type: String,
    default: 'Egypt'
  },
  type:{
    type: String,
    default: 'user'
  },
  externalUrls:{
      key:{
        type: String,
        default: 'Maestro'
      },
      value:{
        type: String,
        default: 'https://open.Maestro.com/users/'
      }
  },
  uri:{
    type: String,
    default: 'Maestro:User:'
  },
  href:{
    type: String,
    default:' https://api.Maestro.com/v1/users/'
  },
  active:{
    type: Boolean,
    default: false
  },
  facebook:{
     token:{
      type: String,
      default: null
     },
     id:{
      type: String
     }

  },
 token:{
    type: String,
    default: null
  },
  loggedByFb:{
    type: Boolean,
    default: false
  },
  phone:{
    type: String,
    default: null
  }
});

module.exports= mongoose.model('User', userSchema);


 
