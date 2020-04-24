const mongoose = require('mongoose')
const Joi = require('joi')

const searchSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  // type: {
  //   type: String,
  //   required: true
  // },
  searchedItems:[{
    id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true},
    type:{
      type: String,
      required: true
    }
  }],
  countSearchedItems:{
    type:Number,
    default:1
  }
})

function validateSearch (search) {
  const schema = {
    query: Joi.string()
      .max(40)
      .required()
  }

  return Joi.validate(search, schema)
}

const Search = mongoose.model('Search', searchSchema)

exports.Search = Search
exports.validateSearch = validateSearch
