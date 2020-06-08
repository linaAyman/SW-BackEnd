const mongoose = require('mongoose');

const followSchema= mongoose.Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
 },
 followingIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist' 
 }],
 followerIds:[{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Artist'
 }],
 type:{
    type: String,
    default: "following"
 }
});
const Follow = mongoose.model('Follow', followSchema);
exports.Follow = Follow