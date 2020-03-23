const mongoose = require('mongoose')
const Joi = require('joi')

const playlistSchema = new mongoose.Schema({
collaborative:{
    type:Boolean,
    required:true
},
public:{
    type:Boolean,
    required:true
},
description:String,
external_urls:{
    type:new mongoose.Schema({
        spotify :{
            type :String,
           // required:true
        }
    }
    )
},
images:[{
    height:Number,
    url:String,
    width:Number
}],
id:{
    type:String,
    required:true},
name:{
    type:String,
    required:true
},
 tracks:[
        {type: mongoose.Schema.Types.ObjectId , required:true,ref:'Track'}
    ],
type:String,
uri:String
})