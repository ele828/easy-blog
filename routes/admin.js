var express = require('express');
var admin = require('../controllers/admin');
var post = require('../controllers/admin/post');
var category = require('../controllers/admin/category');
var link = require('../controllers/admin/link');

var router = express.Router();

/* Admin */
router.get('/', admin.index);
router.post('/login', admin.login);
router.get('/logout', admin.logout);


router.get('/panel', admin.panel);

/* Create a post */
router.get('/post/create', post.showCreatePost);
router.post('/post/create', post.createPost);
router.get('/post/alter/:id', post.showAlterPost);
router.post('/post/alter/:id', post.alterPost);

/* View list of posts */
router.get('/post/view', post.viewPost);

/* Remove a post */
router.get('/post/remove/:id', post.removePost);

/* View list of Category */
router.get('/category/view', category.viewCategory);
router.get('/category/alter/:id', category.showAlterCategory);
router.get('/category/remove/:id', category.removeCategory);

router.get('/category/create', category.showCreateCategory);
router.post('/category/create', category.createCategory);
router.post('/category/alter/:id', category.alterCategory);

/* Links Manager */
router.get('/links/view', link.viewLink);
router.get('/links/create', link.ShowCreateLink);
router.post('/link/create', link.createLink);
router.get('/link/remove/:id', link.removeLink);

module.exports = router;