const mongoose = require('mongoose')
const Joi = require('joi')


const playhistorySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId , 
        required:true,
        ref:'User'
    },
    History:[{
        playedAt:{
            type : Date,
            default:Date.now()
        },
        context:{
            type: new mongoose.Schema({
                type:{
                    type : String,
                    required:true,
                },
                id:{
                    type: String, 
                    required:true,
                }/*,
                curPlayingIndex:{
                    type:Number,
                    default:0
                }*/
            }),
            required : true
        }
        //,
       /*itemPlaying: {
            type: mongoose.Schema.Types.ObjectId , 
            required:true,
            ref:'Track'
        },*/
        
    }]
})
function validatePlayHistory (playHistory) {
    const schema = {
      userId: Joi.required().ObjectId(),
      History:Joi.required()
    }
    return Joi.validate(playHistory, schema)
  }

function validateContext(context){
    const schema ={
        type : Joi.required().valid("track","playlist","album","artist"),
        uri:Joi.required(),
        uri:Joi.string(),
        externalUrl:Joi.required(),
        externalUrl:Joi.string()
    }
    return Joi.validate(context,schema)
}
function validateParameters(parameters)
{
    const schema={
        contextUri:Joi.required(),
        trackId:Joi.required()
    }
    return Joi.validate(parameters,schema)
}
  

const PlayHistory = mongoose.model('PlayHistory', playhistorySchema )

exports.validatePlayHistory=validatePlayHistory
exports.validateContext=validateContext
exports.validateParameters=validateParameters
exports.PlayHistory = PlayHistory;