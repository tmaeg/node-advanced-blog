const UserModel = require('../../models/user')

module.exports = (req, res) => {
  UserModel.findOne({email: req.body.email}, (err, saved) => {
    console.log(saved)
    if(saved) {
      if(saved.password === req.body.password) {
        req.session.userID = saved._id
        res.redirect('/')
      } else {
        res.render('error', {message: 'ログイン失敗'})
      }
    } else {
      res.render('error', {message: 'ログイン失敗'})
    }
  })
}