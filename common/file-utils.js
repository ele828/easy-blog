// Some basic file operations
var fs = require('fs');
var path = require('path');

// Export blog content to a file
exports.writeToFile = function(filename, contents) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path.join(__dirname, "../backup", filename), contents, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
};

// Delete a blog file
exports.deleteAllFile = function() {
    return new Promise(function(resolve, reject) {
        var dirList = fs.readdirSync(path.join(__dirname, "../backup"));
        dirList.forEach(function(fileName){
            fs.unlink(path.join(__dirname, "../backup", fileName), function(err) {
                if(err) reject(err);
                resolve();
            });
        });
    });
};