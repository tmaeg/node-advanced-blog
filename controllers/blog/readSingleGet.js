const BlogModel = require('../../models/blog')

module.exports = async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id)
  res.render('blogRead', {singleBlog, session: req.session.userID})
}