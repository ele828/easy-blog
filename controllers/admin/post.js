var post = require('../../models/post');
var config = require('../../config');

// Show create page
exports.showCreatePost = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}
	res.render('admin/create_post', {
		config: config
	})
}

// Create a new post
exports.createPost = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}
	var title = req.body.title;
	var keywords = req.body.keywords;
	var url = req.body.url;
	var category = req.body.category;
	var contents = req.body.contents;
	var s = res;
	post.createOne({
		title: title,
		contents: contents,
		url: url,
		category: '55117f868f470222e4978de9',
		keywords: keywords
	}).then(function(p) {
		console.log('message');
		res.redirect('/admin/post/view');
	}).catch(function(err) {
		if (err) {
			res.redirect('/admin/post/create');
		}
	});
	// res.json('1')
}

// Show list of posts
exports.viewPost = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}

	post.findAll()
	.then(function(posts) {
		res.render('admin/view_post', {
			config: config,
			posts: posts
		})
	});
}

exports.removePost = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}

	post.removeById(req.params.id)
		.then(function() {
			res.redirect('/admin/post/view');
		});
}