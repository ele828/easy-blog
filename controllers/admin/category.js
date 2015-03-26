var config = require('../../config');
var category = require('../../models/category');
var post = require('../../models/post');

exports.viewCategory = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}
	category.findAll()
			.then(function(categories) {
				res.render('admin/view_category', {
					config: config,
					categories: categories
				});
			});
}

exports.showCreateCategory = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}

	res.render('admin/create_category', {
		config: config
	})

}

exports.createCategory = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}
	var name = req.body.name;
	var url  = req.body.url;

	category.createOne({
		name: name,
		url: url
	}).then(function(c) {
		res.json('success');
	}).catch(function(err) {
		console.log(err);
		if(err)
			res.json('error');
	})
}

exports.removeCategory = function(req, res, next) {
	if(!req.session.logined) {
		res.redirect('/admin');
		return;
	}
	var id = req.params.id;

	// To search if this category contains posts
	post.findByCategoryId(id)
		.then(function(p) {
			// contains posts
			if(p.length > 0) {
				res.redirect('/admin/category/view');
			} else {
				category.removeById(id)
				.then(function() {
					res.redirect('/admin/category/view');
				}).catch(function(err) {
					if(err)
						res.redirect('/admin/category/view');
				})
			}
		});
}