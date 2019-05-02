const xlsx = require('node-xlsx');
const fs = require('fs');
const util = require('util');

/*
*
* Script to read the files in the assets/img folder and their  descriptions from the Gametext.xsl file
* and generate JS objects from the data
*
**/

const objects = [];

// parse the contents of the excel file
const workSheetsFromFile = xlsx.parse(`${__dirname}/Gametext_01.xls`);

workSheetsFromFile.forEach(sheet => sheet.data.forEach((object, index) => {

    // the first line is the heading which should be ignored
    if (index === 0) {
        return
    }

    // remove the hashtag in front of the name
    const getId = (id) => {
        if (id.indexOf('#') === 0) {
            return id.substring(1);
        }

        return id
    };


    // the inventory number is used as an id
    const id = getId(object[0]);
    const name = object[1];

    // add the german and english quiz descriptions
    const quizDescription = object[13];
    const quizDescriptionEN = object[14];

    objects.push({id, name, quizDescription, locales: { en: { quizDescription: quizDescriptionEN }}})
}));

// read the files
function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(filenames)
        });
    })
}

// display the result on the console
readFiles('src/assets/img/')
    .then((fileNames) => console.log(util.inspect(objects.map((object, index) => {
            const src = fileNames.find(file => file.includes(object.id));
            return Object.assign({}, object, {src})
        }
    ), {showHidden: false, depth: null})))
    .catch(err => console.log(err));
