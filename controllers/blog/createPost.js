const BlogModel = require('../../models/blog')

module.exports = (req, res) => {
  console.log(req.body)
  BlogModel.create(req.body, (err, saved) => {
    if(err) {
      res.render('error', {message: 'ブログ投稿失敗'})
    } else {
      res.redirect('/')
    }
  })
}