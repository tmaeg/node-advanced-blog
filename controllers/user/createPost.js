const UserModel = require('../../models/user')

module.exports = (req, res) => {
  UserModel.create(req.body, (err, saved) => {
    if(err) {
      res.render('error', {message: 'ユーザー登録失敗'})
    } else {
      res.send('/user/login')
    }
  })
}