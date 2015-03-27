var config = require('../config');
var post = require('../models/post');
var category = require('../models/category');

/* blog list controller */
exports.index = function(req, res, next) {

	post.findAll()
	.then(function(posts) {
		console.log(posts);
		res.render('blog', {
			config: config,
			posts: posts
		})
	});

}

/* Replace by populate method
function searchCategoryName(posts) {
	var deferred = Promise.defer();
	Promise.all(posts.map(function(post) {
		var defer = Promise.defer();
		category_id = post.category;
		category.findById(category_id)
			.then(function(c) {
				if (c == null) defer.resolve(post);
				post.category_name = c.name;
				defer.resolve(post);
			}.bind(this));
		return defer.promise;
	})).then(function(posts) {
		deferred.resolve(posts);
	});
	return deferred.promise;
}
*/