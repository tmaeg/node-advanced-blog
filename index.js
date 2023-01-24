const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose')
const session = require('express-session')
const routes = require('./routes')
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

//--- Session
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 300000},
}))

//--- mongooseへの接続
mongoose.connect('mongodb+srv://dkyukinaga:1274bunei@cluster0.oowrvec.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Mongooseに接続した！')
  }).catch(err => {
    console.error(err)
  })

app.use(routes)

//---
app.get('*', (req, res) => {
  res.render('error', {message: 'ページが見つかりません'})
})

//---
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})