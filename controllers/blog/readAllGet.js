const BlogModel = require('../../models/blog')

module.exports = async (req, res) => {
  const allBlogs = await BlogModel.find()
  res.render('index', {allBlogs, session: req.session.userID})
}