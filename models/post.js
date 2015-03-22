var mongoose = require('mongoose');
var formatDate = require('format-date');

var postSchema = new mongoose.Schema({
	title:      { type: String },
	contents:   { type: String },
	date:       { type: Date,   default: Date.now },
	views:      { type: Number, default: 0 },
	stars:      { type: Number, default: 0 },
	url:        { type: String, unique: true }
});

postSchema.statics.findOneByUrl = function(url) {
	return new Promise(function(resolve, reject) {
			this.findOne({'url' : url})
				.exec(function(err, post) {
					if(err) reject();
					Object.defineProperty(post, 'date' ,{
						writable: true
					});
					post.date = formatDate('{year}-{month}-{day}', post.date);
					resolve(post);
				});
		}.bind(this));
}

postSchema.statics.findAll = function() {
 	return new Promise(function(resolve, reject) {
	 		this.find({},{title: 1, date: 1, url: 1, _id: 0})
	 			.sort({"_id": -1})
	 			.exec(function(err, posts) {
	 				if(err) reject();
	 				for(var i=0; i<posts.length; i++) {
	 					Object.defineProperty(posts[i], 'date' ,{
							writable: true
						});
						posts[i].date = formatDate('{year}-{month}-{day}', posts[i].date);
	 				}
					resolve(posts);
	 			});
		}.bind(this));
}

postSchema.statics.createOne = function(post) {
	return new Promise(function(resolve, reject) {
			this.create(post)
				.exec(function(err, post) {
					if(err) reject();
					resolve(post);
				});
		}.bind(this));
}

var PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;