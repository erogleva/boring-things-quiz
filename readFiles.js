const fs = require('fs');

function readFiles(dirname) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(filenames);
    });
}

readFiles('src/components/level-one/objects/img/');