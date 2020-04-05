const mongoose = require('mongoose')
const Joi = require('joi')

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    href: {
        type: String
    },
    icons: [{height: Number, url: String, width: String }]
})

const Artist = mongoose.model('Artist', artistSchema)
exports.Artist = Artist