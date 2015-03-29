var config = require('../../config');
var link = require('../../models/link');

exports.viewLink = function(req, res, next) {
	link.findAll()
		.then(function(links) {
			res.render('admin/view_link', {
				config: config,
				links: links
			})
		})
}

exports.ShowCreateLink = function(req, res, next) {
	res.render('admin/create_link', {
		config: config
	})
}

exports.createLink = function(req, res, next) {
	var name = req.body.name;
	var url = req.body.url;
	link.createOne({
		name: name,
		url: url
	}).then(function() {
		res.redirect('/admin/links/view');
	});
}

exports.removeLink = function(req, res, next) {
	var id = req.params.id;
	link.removeById(id)
		.then(function() {
			res.redirect('/admin/links/view');
		});
}