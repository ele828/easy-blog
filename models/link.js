var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var LinkSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  url: {
    type: String,
    unique: true
  }
});

LinkSchema.statics.createOne = function(link) {
  return new Promise(function(resolve, reject) {
    this.create(link, function(err, l) {
      if(err)
        reject(err);
      resolve(l);
    });
  }.bind(this));
}


LinkSchema.statics.findAll = function() {
  return new Promise(function(resolve, reject) {
    this.find({})
      .sort({
        '_id': 1
      })
      .exec(function(err, links) {
        if(err)
          reject(err);
        resolve(links);
      });

  }.bind(this));
}

LinkSchema.statics.removeById = function(id) {
  return new Promise(function(resolve, reject) {
    this.remove({_id: id}, function(err, c) {
      if (err)
        reject(err)
      resolve(c);
    });
  }.bind(this));
}


module.exports = mongoose.model('Link', LinkSchema);