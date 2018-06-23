const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lockedStatus: { type: mongoose.SchemaTypes.Boolean, default: false },
  isMain: { type: mongoose.SchemaTypes.Boolean, default: true },
  edits: { type: [mongoose.SchemaTypes.ObjectId], default: [] }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
