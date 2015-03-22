var config = require('../config');
var post = require('../models/post');

/* blog list controller */
module.exports = function(req, res, next) {

	// post.createOne({
	// 	title: '这个一篇文章啊真的',
	// 	contents: '挺不错的，继续努力啊。加油',
	// 	url: 'an-article'
	// },function(err, docs) {
	// 	console.log(docs);
	// })

	post.findAll(function(err, posts) {
		res.render('blog', {
			config: config,
			posts: posts
		})
	});
}