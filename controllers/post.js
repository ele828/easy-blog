var config = require('../config');
var post = require('../models/post');

module.exports = function(req, res, next) {
	var url = req.params.url;
	
	post.findOneByUrl(url)
		.then(function(post) {
			res.render('post', {
				config: config,
				post: post
			});
		});
}