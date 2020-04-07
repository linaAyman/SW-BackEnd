const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    playlists:[{type: mongoose.Schema.Types.ObjectId , required:true,ref:'Playlist'}],
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    
})

const Category = mongoose.model('Category', categorySchema)
exports.Category = Category