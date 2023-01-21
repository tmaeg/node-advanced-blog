const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose')
const session = require('express-session')
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

//--- スキーマとモデルを定義
const BlogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  image: String,
  textBody: String,
})
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})
const BlogModel = mongoose.model('Blog', BlogSchema)
const UserModel = mongoose.model('User', UserSchema)

//--- Create blog
app.get('/blog/create', (req, res) => {
  if(req.session.userID) {
    res.render('blogCreate')
  } else {
    res.redirect('/user/login')
  }
})

app.post('/blog/create', (req, res) => {
  console.log(req.body)
  BlogModel.create(req.body, (err, saved) => {
    if(err) {
      res.render('error', {message: 'ブログ投稿失敗'})
    } else {
      res.redirect('/')
    }
  })
})

//--- Read all blogs
app.get('/', async (req, res) => {
  const allBlogs = await BlogModel.find()
  res.render('index', {allBlogs, session: req.session.userID})
})

//--- Read single blog
app.get('/blog/:id', async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id)
  res.render('blogRead', {singleBlog, session: req.session.userID})
})

//--- Update blog
app.get('/blog/update/:id', async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id)
  res.render('blogUpdate', {singleBlog})
})
app.post('/blog/update/:id', (req, res) => {
  BlogModel.updateOne({_id: req.params.id}, req.body).exec(err => {
    if(err) {
      res.reder('error', {message: 'ブログ編集失敗'})
    } else {
      res.redirect('/')
    }
  })
})

//--- Delete blog
app.get('/blog/delete/:id', async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id)
  res.render('blogDelete', {singleBlog})
})
app.post('/blog/delete/:id', (req, res) => {
  BlogModel.deleteOne({_id: req.params.id}).exec(err => {
    if(err) {
      res.render('error', {message: 'ブログ削除失敗'})
    } else {
      res.redirect('/')
    }
  })
})

//--- Create user
app.get('/user/create', (req, res) => {
  res.render('userCreate')
})
app.post('/user/create', (req, res) => {
  UserModel.create(req.body, (err, saved) => {
    if(err) {
      res.render('error', {message: 'ユーザー登録失敗'})
    } else {
      res.send('/user/login')
    }
  })
})

//--- User login
app.get('/user/login', (req, res) => {
  res.render('userLogin')
})
app.post('/user/login', (req, res) => {
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
})

//---
const port = process.env.port || 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})