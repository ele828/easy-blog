var config = require('../config');
var post = require('../models/post');

module.exports = function(req, res, next) {
	url = req.params.url;
	post.findOneByUrl(url, function(err, post) {
		if(err) console.log(err);
		res.render('post', {
			config: config,
			post: post
		});
	});
}