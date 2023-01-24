const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  image: String,
  textBody: String,
})

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel