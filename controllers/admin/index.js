var config = require('../../config');
var post = require('../../models/post');

exports.index = function(req, res, next) {
	res.render('admin/index', {
		config: config
	});
};

exports.login = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	if(username === config.admin.username &&
	   password === config.admin.password) {
		res.redirect('/admin/create-post');
	} else {
		res.redirect('/admin');
	}
}

// Show create page
exports.showCreatePost = function(req, res, next) {
	res.render('admin/create_post', {
		config: config
	})
}

// Create a new post
exports.createPost = function(req, res, next) {
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
		res.redirect('/blog');
	}).catch(function(err) {
		if(err) {
			res.redirect('/admin/create-post/');
		}
	});
	// res.json('1')
}