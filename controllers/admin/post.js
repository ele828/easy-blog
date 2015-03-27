var config = require('../../config');
var post = require('../../models/post');
var category = require('../../models/category');

// Show create page
exports.showCreatePost = function(req, res, next) {
	// Fetch category data
	category.findAll()
			.then(function(categories) {
				res.render('admin/create_post', {
					config: config,
					categories: categories
				});
			});
}

// Create a new post
exports.createPost = function(req, res, next) {
	var title = req.body.title;
	var keywords = req.body.keywords;
	var url = req.body.url;
	var category = req.body.category;
	var contents = req.body.contents;
	post.createOne({
		title: title,
		contents: contents,
		url: url,
		category: category,
		keywords: keywords
	}).then(function(p) {
		console.log(p);
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
	post.findAll()
	.then(function(posts) {
		res.render('admin/view_post', {
			config: config,
			posts: posts
		})
	});
}

exports.removePost = function(req, res, next) {
	post.removeById(req.params.id)
		.then(function() {
			res.redirect('/admin/post/view');
		});
}

exports.showAlterPost = function(req, res, next) {
	var id = req.params.id;
	var p, categories;

	function GetCategories(ps) {
		var defer = Promise.defer();
		p = ps;
		category.findAll()
		.then(function(cs) {
			categories = cs;
			defer.resolve(post);
		});
		return defer.promise;
	}

	function Render() {
		res.render('admin/alter_post', {
			config: config,
			post: p,
			categories: categories
		});
	}

	post.findOneById(id).then(GetCategories).then(Render);
}

exports.alterPost = function(req, res, next) {
	var id = req.params.id;

	var title = req.body.title;
	var keywords = req.body.keywords;
	var url = req.body.url;
	var category = req.body.category;
	var contents = req.body.contents;
	post.updateById(id, {
		title: title,
		contents: contents,
		url: url,
		category: category,
		keywords: keywords
	}).then(function(p) {
		console.log(p);
		res.redirect('/admin/post/view');
	}).catch(function(err) {
		if (err) {
			res.redirect('/admin/post/alter/'+id);
		}
	});
}