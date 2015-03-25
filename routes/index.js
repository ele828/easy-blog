var express = require('express');

/* import controllers */
var blog = require('../controllers/blog');
var post = require('../controllers/post');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

/* Blog lists */
router.get('/blog', blog.index);

/* Post specific pages */
router.get('/post/:url', post.index);

module.exports = router;