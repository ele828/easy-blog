var express = require('express');

/* import controllers */
var blog = require('../controllers/blog');
var post = require('../controllers/post');
var admin = require('../controllers/admin');

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

/* Admin */
router.get('/admin', admin.index);
router.post('/admin/login', admin.login);

router.get('/admin/create-post', admin.showCreatePost);
router.post('/admin/create-post/create', admin.createPost);

module.exports = router;