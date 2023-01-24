const BlogModel = require('../../models/blog')

module.exports = (req, res) => {
  BlogModel.updateOne({_id: req.params.id}, req.body).exec(err => {
    if(err) {
      res.reder('error', {message: 'ブログ編集失敗'})
    } else {
      res.redirect('/')
    }
  })
}