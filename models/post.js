var mongoose = require('mongoose');
var formatDate = require('format-date');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
	title:      { type: String },
	contents:   { type: String },
	category:   { type: Schema.Types.ObjectId },
	keywords:   { type: String, default: '' },
	date:       { type: Date,   default: Date.now },
	views:      { type: Number, default: 0 },
	stars:      { type: Number, default: 0 },
	url:        { type: String, unique: true }
});

PostSchema.statics.findOneByUrl = function(url) {
	return new Promise(function(resolve, reject) {
			this.findOne({'url' : url})
				.exec(function(err, post) {
					if(err) reject(err);
					Object.defineProperty(post, 'date' ,{
						writable: true
					});
					post.date = formatDate('{year}-{month}-{day}', post.date);
					resolve(post);
				});
		}.bind(this));
}

PostSchema.statics.findAll = function() {
 	return new Promise(function(resolve, reject) {
	 		this.find({},{title: 1, 
	 					  date: 1, 
	 					  url: 1, 
	 					  category: 1, 
	 					  keywords: 1, 
	 					  _id: 0})
	 			.sort({"_id": -1})
	 			.exec(function(err, posts) {
	 				if(err) reject(err);
	 				for(var i=0; i<posts.length; i++) {
	 				// 	Object.defineProperty(posts[i], 'date' ,{
						// 	writable: true
						// });
						// posts[i].date = formatDate('{year}-{month}-{day}', posts[i].date);
						console.log(new Date(posts[i].date.toString()));
	 				}
					resolve(posts);
	 			});
		}.bind(this));
}

PostSchema.statics.createOne = function(post) {
	return new Promise(function(resolve, reject) {
			this.create(post)
				.exec(function(err, post) {
					if(err) reject(err);
					resolve(post);
				});
		}.bind(this));
}

module.exports = mongoose.model('Post', PostSchema);