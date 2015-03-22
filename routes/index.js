var express = require('express');

/* import controllers */
var blogHandler = require('../controllers/blog');
var postHandler = require('../controllers/post');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Blog lists */
router.get('/blog', blogHandler);

/* Post specific pages */
router.get('/post/:url', postHandler);

module.exports = router;
