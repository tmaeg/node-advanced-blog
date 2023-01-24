const BlogModel = require('../../models/blog')

module.exports = (req, res) => {
  BlogModel.deleteOne({_id: req.params.id}).exec(err => {
    if(err) {
      res.render('error', {message: 'ブログ削除失敗'})
    } else {
      res.redirect('/')
    }
  })
}