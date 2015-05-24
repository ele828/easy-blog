var config = require('../config');
var post = require('../models/post');
var category = require('../models/category');
var link = require('../models/link');

/* blog list controller */
exports.index = function(req, res, next) {
	post.findAll()
        .then(function(posts) {
            res.render('blog', {
                config: config,
                posts: posts
            })
        });
};

exports.links = function(req, res, next) {
	link.findAll()
		.then(function(links) {
				res.render('links', {
					config: config,
					links: links
				});
		});
};

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