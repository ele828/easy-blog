var config = require('../config');
var post = require('../models/post');
var tools = require('../common/tools');

exports.index = function(req, res, next) {
	var url = req.params.url;

	function ParseMarkdown(post) {
		post.contents = tools.markdownParser(post.contents);
		return post;
	}

	function Render(post) {
		res.render('post', {
			config: config,
			post: post
		});
	}

	post.findOneByUrl(url)
		.then(ParseMarkdown)
		.then(Render);
}