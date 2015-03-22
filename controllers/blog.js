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

	// post.createOne({
	// 	title: 'Promise生成的博文111',
	// 	contents: "就是测试一下效果而已啦222",
	// 	url: 'just-play-demo-2'
	// }).then(function(post) {
	// 	console.log(post)
	// });

	post.findAll()
		.then(function(posts) {
			res.render('blog', {
				config: config,
				posts: posts
			})
		});

}