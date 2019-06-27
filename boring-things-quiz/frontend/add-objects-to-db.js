const xlsx = require('node-xlsx');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

/*
*
* Script to read the files in the assets/img folder and their  descriptions from the Gametext.xsl file
* and generate JS objects from the data
*
**/

const objects = [];

// parse the contents of the excel file
const workSheetsFromFile = xlsx.parse(`${__dirname}/Gametexte.xls`);

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

    const detailedDescription = object[16];
    const detailedDescriptionEN = object[17];

    // console.log(object);

    objects.push({id, name, quizDescription, detailedDescription, locales: { en: { quizDescription: quizDescriptionEN, detailedDescription: detailedDescriptionEN }}})
}));

(async function () {
  for (let object of objects) {
      try {
          await axios.post(`${process.argv[2]}/items/`, object);
      } catch (e) {
          console.log(e);
      }
  }
})();

