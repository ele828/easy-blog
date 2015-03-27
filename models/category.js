var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CategorySchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	url: {
		type: String,
		unique: true
	}
});

CategorySchema.statics.createOne = function(category) {
	return new Promise(function(resolve, reject) {
		this.create(category, function(err, c) {
			if(err)
				reject(err);
			resolve(c);
		});
	}.bind(this));
}

CategorySchema.statics.findById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				_id: id
			})
			.exec(function(err, category) {
				if (err) reject(err);
				resolve(category);
			});
	}.bind(this));
}

CategorySchema.statics.findAll = function() {
	return new Promise(function(resolve, reject) {
		this.find({})
			.sort({
				'_id': -1
			})
			.exec(function(err, categories) {
				if(err)
					reject(err);
				resolve(categories);
			});

	}.bind(this));
}

CategorySchema.statics.removeById = function(id) {
	return new Promise(function(resolve, reject) {
		this.remove({_id: id}, function(err, c) {
			if (err)
				reject(err)
			resolve(c);
		});
	}.bind(this));
}

CategorySchema.statics.updateById = function(id, props) {
	return new Promise(function(resolve, reject) {
		this.update({ _id: id }, { $set: props}).exec(function(err, numberAffected, raw) {
			if(err) {
				reject(err);
			}
			resolve(numberAffected);
		});
	}.bind(this));
}

module.exports = mongoose.model('Category', CategorySchema);