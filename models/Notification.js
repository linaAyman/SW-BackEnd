const mongoose = require('mongoose')
const Joi = require('joi')
const Track=require('./Track')
const User=require('./User')



const notificationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId ,
         required:true,
         ref:'User'
    },
    notifications:[{
        type: String
        
    }]
})
//this validation needs to be revised later

function validateNotifications (notification) {
    const schema = {
        user:Joi.required(),
        //tracks : Joi.required()
    }
  
    return Joi.validate(notification, schema)
  }

const Notification = mongoose.model("Notifications", notificationSchema )

exports.validateNotifications=validateNotifications
exports.Notification =Notification   


