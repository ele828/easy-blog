var express = require('express');
var admin = require('../controllers/admin');
var post = require('../controllers/admin/post');

var router = express.Router();

/* Admin */
router.get('/', admin.index);
router.post('/login', admin.login);

/* Create a post */
router.get('/post/create', post.showCreatePost);
router.post('/post/create', post.createPost);

/* View list of posts */
router.get('/post/view', post.viewPost);

/* Remove a post */
router.get('/post/remove/:id', post.removePost);

module.exports = router;