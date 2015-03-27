var config = require('../../config');
var category = require('../../models/category');
var post = require('../../models/post');

exports.viewCategory = function(req, res, next) {
	category.findAll()
			.then(function(categories) {
				res.render('admin/view_category', {
					config: config,
					categories: categories
				});
			});
}

exports.showCreateCategory = function(req, res, next) {
	res.render('admin/create_category', {
		config: config
	})

}

exports.createCategory = function(req, res, next) {
	var name = req.body.name;
	var url  = req.body.url;

	category.createOne({
		name: name,
		url: url
	}).then(function(c) {
		res.redirect('/admin/category/view');
	}).catch(function(err) {
		if(err)
			res.redirect('/admin/category/view');
	})
}

exports.showAlterCategory = function(req, res, next) {
	// Fetch this category's info by its id
	var id = req.params.id;
	category.findById(id)
			.then(function(cat) {
				res.render('admin/alter_category', {
					config: config,
					category: cat
				});
			});
}

exports.alterCategory = function(req, res, next) {
	var id = req.params.id;
	var name = req.body.name;
	var url = req.body.url;

	category.updateById(id, {
		name: name,
		url: url
	}).then(function(nums) {
		res.redirect('/admin/category/view');
	});
}

exports.removeCategory = function(req, res, next) {
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