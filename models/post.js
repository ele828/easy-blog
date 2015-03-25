var mongoose = require('mongoose');
var tools = require('../common/tools.js');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
	title: {
		type: String
	},
	contents: {
		type: String
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
	url: {
		type: String,
		unique: true
	},
	keywords: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	views: {
		type: Number,
		default: 0
	},
	stars: {
		type: Number,
		default: 0
	},
});

PostSchema.statics.findOneByUrl = function(url) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				'url': url
			})
			.lean()
			.populate('category')
			.exec(function(err, post) {
				if (err)
					reject(err);
				post.date = tools.formatDate(post.date);
				resolve(post);
			});
	}.bind(this));
}

PostSchema.statics.findAll = function() {
	return new Promise(function(resolve, reject) {
		this.find({}, {
				title: 1,
				date: 1,
				url: 1,
				category: 1,
				keywords: 1,
				_id: 0
			})
			.sort({
				"_id": -1
			})
			.lean()
			.populate('category')
			.exec(function(err, posts) {
				if (err)
					reject(err);
				for (var i = 0; i < posts.length; i++) {
					posts[i].date = tools.formatDate(posts[i].date);
				}
				resolve(posts);
			});
	}.bind(this));
}

PostSchema.statics.createOne = function(post) {
	return new Promise(function(resolve, reject) {
		this.create(post, function(err, p) {
			if (err)
				reject(err)
			resolve(p);
		});
	}.bind(this));
}

module.exports = mongoose.model('Post', PostSchema);