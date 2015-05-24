var config = require('../config');
var post = require('../models/post');
var Github = require('github-api');
var iconv = require('iconv-lite');
var url = require('url');

var USERNAME = config.github.username;
var PASSWORD = config.github.password;

var github = new Github({
  username: USERNAME,
  password: PASSWORD,
  auth: 'basic'
});

var repo = github.getRepo(USERNAME, config.github.repository);

exports.upload = function() {
    return new Promise(function(resolve, reject) {
        getRemoteFileList()
            .then(function(remoteFileList) {
                console.log(remoteFileList);
                findContentAndUpload(remoteFileList)
                    .then(function() {
                        resolve();
                    });
            });
    });
};

exports.deleteAllFile = function() {
    return new Promise(function(resolve, reject) {
        getRemoteFileList().
            then(function(remoteFileList) {
                remoteFileList.forEach(function(aFile) {
                    repo.remove('master', encodeURI(aFile), function(err) {
                        if(err) console.log(err);
                    });
                });
            });
        resolve();
    });
};

function findContentAndUpload(remoteFileList) {
    return new Promise(function(resolve, reject) {
        post.findAllWithContents().
            then(function(posts) {
                posts.forEach(function(post) {
                    var localFileName = post.title+'.md';
                    for(var i = 0; i < remoteFileList.length; i++) {
                        // Have existed at remote
                        if(localFileName === remoteFileList[i]) {
                            return;
                        }
                    }
                    console.log("start to upload " + localFileName);

                    // Haven't existed at remove
                    // Do upload to github right away
                    var contents = "# "+post.title+"\n"+post.contents;
                    var encodeContents = iconv.encode(contents, 'utf-8');

                    repo.write('master', encodeURI(localFileName), encodeContents, '发布博文：'+post.title, function(err) {
                        if(err) console.log(err);
                        console.log('success!');
                    });
                });
            }).then(function() {
                resolve();
            });
    });
}

function getRemoteFileList() {
    return new Promise(function(resolve, reject) {
        repo.getTree('master', function(err, tree) {
            var remoteFileList = [];
            if(tree != undefined) {
                tree.forEach(function (node) {
                    if (node.path.indexOf('.md') > 0) {
                        remoteFileList.push(node.path);
                    }
                });
            }
            resolve(remoteFileList);
        });
    });
}