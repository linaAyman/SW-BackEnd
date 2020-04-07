const mongoose = require('mongoose');

const randSchema= mongoose.Schema({
 userId:{
    type: mongoose.Schema.Types.ObjectId,
 },
 randNo:{
    type: String, 
 },
 date:{
    type: Date,
    default: Date.now  
 }
});
module.exports= mongoose.model('RandHash', randSchema);