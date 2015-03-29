var express = require('express');

/* import controllers */
var blog = require('../controllers/blog');
var post = require('../controllers/post');
var home = require('../controllers/index');

var router = express.Router();

/* GET home page. */
router.get('/', home);

/* Blog lists */
router.get('/blog', blog.index);
router.get('/links', blog.links);

/* Post specific pages */
router.get('/post/:url', post.index);
router.post('/post/star', post.star);

module.exports = router;