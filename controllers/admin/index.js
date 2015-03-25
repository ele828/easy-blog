var config = require('../../config');

exports.index = function(req, res, next) {
	res.render('admin/index', {
		config: config
	});
};

exports.login = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	if (username === config.admin.username &&
		password === config.admin.password) {
		req.session.logined = true;
		res.redirect('/admin/post/create');
	} else {
		res.redirect('/admin');
	}
}