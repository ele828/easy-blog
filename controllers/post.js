var config = require('../config');
var postModel = require('../models/post');
var tools = require('../common/tools');

exports.index = function(req, res, next) {
  var url = req.params.url;
  var post = {};

  function ParseMarkdown() {
    post.contents = tools.markdownParser(post.contents);
    return post;
  }

  function Render() {
    res.render('post', {
      config: config,
      post: post
    });
  }

  function IncreaseView(_post) {
    var defer = Promise.defer();
    post = _post;
    postModel.IncOneViewById(_post._id)
      .then(function() {
        defer.resolve();
      });
    return defer.promise;
  }

  postModel.findOneByUrl(url)
    .then(IncreaseView)
    .then(ParseMarkdown)
    .then(Render)
    .catch(function(err) {
      next(err);
    }.bind(this));
}

exports.star = function(req, res, next) {
  var id = req.body.id;
  postModel.IncOneStarById(id)
      .then(function() {
        res.json("success");
      });
}