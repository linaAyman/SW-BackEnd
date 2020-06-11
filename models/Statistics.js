const mongoose = require('mongoose');

const statisticsSchema= mongoose.Schema({
 artist:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Artist'
 },
 listenersNo:{
    type: Number
 },
 likesNo:{
   type: Number
 },
 type:{
    type: String,
    default: "statistics"
 }
});
const Statistics = mongoose.model('Statistics', statisticsSchema);
exports.Statistics = Statistics