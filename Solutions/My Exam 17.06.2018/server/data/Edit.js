const mongoose = require('mongoose')

const editSchema = new mongoose.Schema({
  author: { type: String, required: true },
  creationDate: {type: Date, default: Date.now},
  content: {type: String, required: true},
  articleId: {type: mongoose.SchemaTypes.ObjectId, required: true}
})

const Edit = mongoose.model('Edit', editSchema)

module.exports = Edit
