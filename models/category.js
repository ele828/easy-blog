var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CategorySchema = new Schema({
	name:    { type: String, unique: true },
	url:     { type: String, unique: true }
});

CategorySchema.statics.createOne = function(category) {
	return new Promise(function(resolve, reject) {
			this.create(category)
				.exec(function(err, category) {
					if(err) reject(err);
					resolve(category);
				});
		}.bind(this));
}

CategorySchema.statics.findById = function(id) {
	return new Promise(function(resolve, reject) {
			this.findOne({_id: id})
				.exec(function(err, category) {
					if(err) reject(err);
					resolve(category);
				});
	}.bind(this));
}

module.exports = mongoose.model('Category', CategorySchema);