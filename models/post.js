var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title:      { type: String },
	contents:   { type: String },
	date:       { type: Date,   default: Date.now },
	views:      { type: Number, default: 0 },
	starts:     { type: Number, default: 0 },
	url:        { type: String, unique: true }
});

postSchema.statics.findOneByUrl = function(url, cb) {
	this.findOne({ 'url' : url }, cb);
}

postSchema.statics.findAll = function(cb) {
 	this.find({}, cb);
}

postSchema.statics.createOne = function(post, cb) {
	this.create(post, cb);
}

var PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;