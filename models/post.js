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
	}
});

PostSchema.statics.findOneByUrl = function(url) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				'url': url
			})
			.lean()
			.populate('category')
			.exec(function(err, post) {
				if (err || post == null) {
					return reject(err);
				} else {
					post.date = tools.formatDate(post.date);
					resolve(post);
				}
			});
	}.bind(this));
};

PostSchema.statics.findOneById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				'_id': id
			})
			.lean()
			.populate('category')
			.exec(function(err, post) {
				if (err)
					return reject(err);
				post.date = tools.formatDate(post.date);
				resolve(post);
			});
	}.bind(this));
};

PostSchema.statics.findAll = function() {
	return new Promise(function(resolve, reject) {
		this.find({}, {
				contents: 0
			})
			.sort({
				"_id": -1
			})
			.lean()
			.populate('category')
			.exec(function(err, posts) {
				if (err)
					return reject(err);
				for (var i = 0; i < posts.length; i++) {
					posts[i].date = tools.formatDate(posts[i].date);
				}
				resolve(posts);
			});
	}.bind(this));
};

PostSchema.statics.findAllWithContents = function() {
    return new Promise(function(resolve, reject) {
        this.find({})
            .sort({
                "_id": -1
            })
            .lean()
            .populate('category')
            .exec(function(err, posts) {
                if (err)
                    return reject(err);
                for (var i = 0; i < posts.length; i++) {
                    posts[i].date = tools.formatDate(posts[i].date);
                }
                resolve(posts);
            });
    }.bind(this));
};

PostSchema.statics.createOne = function(post) {
	return new Promise(function(resolve, reject) {
		this.create(post, function(err, p) {
			if (err)
				return reject(err)
			resolve(p);
		});
	}.bind(this));
};

PostSchema.statics.updateById = function(id, props) {
	return new Promise(function(resolve, reject) {
		this.update({
			_id: id
		}, {
			$set: props
		}).exec(function(err, numberAffected, raw) {
			if (err) {
				return reject(err);
			}
			resolve(numberAffected);
		});
	}.bind(this));
};

PostSchema.statics.removeById = function(id) {
	return new Promise(function(resolve, reject) {
		this.remove({
			_id: id
		}, function(err, p) {
			if (err)
				return reject(err)
			resolve(p);
		});
	}.bind(this));
};

PostSchema.statics.findByCategoryId = function(cid) {
	return new Promise(function(resolve, reject) {
		this.find({
				'category': cid
			})
			.lean()
			.exec(function(err, post) {
				if (err)
					return reject(err);
				resolve(post);
			});
	}.bind(this));
};

PostSchema.statics.IncOneViewById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findByIdAndUpdate(id, { $inc: { views: 1 }}, function(err) {
			if(err) {
				return reject(err);
			}
			resolve();
		});
	}.bind(this));
};

PostSchema.statics.IncOneStarById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findByIdAndUpdate(id, { $inc: { stars: 1 }}, function(err) {
			if(err) {
				return reject(err);
			}
			resolve();
		});
	}.bind(this));
};

module.exports = mongoose.model('Post', PostSchema);