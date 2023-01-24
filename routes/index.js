const express = require('express')
const routes = express.Router()

const blogCreateGet = require('../controllers/blog/createGet')
const blogCreatePost = require('../controllers/blog/createPost')
const blogDeleteGet = require('../controllers/blog/deleteGet')
const blogDeletePost = require('../controllers/blog/deletePost')
const blogReadAllGet = require('../controllers/blog/readAllGet')
const blogReadSingleGet = require('../controllers/blog/readSingleGet')
const blogUpdateGet = require('../controllers/blog/updateGet')
const blogUpdatePost = require('../controllers/blog/updatePost')
const userCreateGet = require('../controllers/user/createGet')
const userCreatePost = require('../controllers/user/createPost')
const userLoginGet = require('../controllers/user/loginGet')
const userLoginPost = require('../controllers/user/loginPost')

//--- Create blog
routes.get('/blog/create', blogCreateGet)
routes.post('/blog/create', blogCreatePost)

//--- Read all blogs
routes.get('/', blogReadAllGet)

//--- Read single blog
routes.get('/blog/:id', blogReadSingleGet)

//--- Update blog
routes.get('/blog/update/:id', blogUpdateGet)
routes.post('/blog/update/:id', blogUpdatePost)

//--- Delete blog
routes.get('/blog/delete/:id', blogDeleteGet)
routes.post('/blog/delete/:id', blogDeletePost)

//--- Create user
routes.get('/user/create', userCreateGet)
routes.post('/user/create', userCreatePost)

//--- User login
routes.get('/user/login', userLoginGet)
routes.post('/user/login', userLoginPost)

module.exports = routes