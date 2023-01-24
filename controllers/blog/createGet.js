module.exports = (req, res) => {
  if(req.session.userID) {
    res.render('blogCreate')
  } else {
    res.redirect('/user/login')
  }
}