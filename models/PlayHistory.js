const mongoose = require('mongoose')
const Joi = require('joi')


const playhistorySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId , 
        required:true,
        ref:'User'
    },
    History:[{
            
                type:{
                    type : String,
                    required:true,
                },
                id:{
                    type: mongoose.Schema.Types.ObjectId, 
                    required:true,
                }
                
    }],
    //number of items in the history array
    HistoryLen:{
        type:Number,
        default:1
    }
})
function validatePlayHistory (playHistory) {
    const schema = {
      userId: Joi.required().ObjectId(),
      History:Joi.required()
    }
    return Joi.validate(playHistory, schema)
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
exports.PlayHistory = PlayHistory;