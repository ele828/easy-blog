var post      = require('../../models/post');
var github    = require('../../common/github');
var fileUtils = require('../../common/file-utils');

exports.backAllPosts = function(req, res, next) {
    // Read all posts from mongodb
    post.findAllWithContents().
        then(function(posts) {
            // Iterate posts and write to file
            posts.forEach(function(aPost) {
                // Store a post
                fileUtils.writeToFile(aPost.title + '.md', "# " + aPost.title + "\n" + aPost.contents);
            });
            res.json('success');
        }).
        catch(function(err) {
            res.json(err.message);
        });
};

exports.deleteAllPosts = function(req, res, next) {
    fileUtils.deleteAllFile().
        then(function() {
           res.json('success');
        }).
        catch(function(err) {
            res.json(err.message);
        });
};

exports.uploadToGithub = function(req, res, next) {
    github.upload()
        .then(function() {
           res.json('upload success');
        });
};

exports.deleteAllFromGithub = function(req, res, next) {
    github.deleteAllFile()
        .then(function() {
           res.json('remove success');
        });
};