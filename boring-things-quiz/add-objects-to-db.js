const xlsx = require('node-xlsx');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const path = require('path');
const request = require('request');

/*
*
* Script to read the files in the assets/img folder and their descriptions from the Gametext.xsl file
* and generate JS objects from the data
*
**/

const readdir = util.promisify(fs.readdir);
const objects = [];

// parse the contents of the excel file
const workSheetsFromFile = xlsx.parse(path.join(__dirname, 'Objekte_Metadaten_GS_FS_Korr.xls'));

workSheetsFromFile.forEach(sheet => sheet.data.forEach((object, index) => {

    // the first line is the heading which should be ignored
    if (index === 0) {
        return
    }
    // remove the hashtag in front of the name
    const getInventoryNumber = (id) => {
        if (id.indexOf('#') === 0) {
            return id.substring(1);
        }

        return id
    };

    // the inventory number is used as an id
    const inventoryNumber = getInventoryNumber(object[0]);
    const name = object[1];

    // add the german and english quiz descriptions
    const quizDescriptionDE = object[13];
    const quizDescriptionEN = object[14];

    const detailedDescriptionDE = object[16];
    const detailedDescriptionEN = object[17];

    objects.push({name, quizDescriptionDE, detailedDescriptionDE, detailedDescriptionEN, quizDescriptionEN, inventoryNumber})
}));

(async function () {
    const imagesPath = [__dirname, 'src', 'assets', 'img'];
  for (let object of objects) {
      try {
          const response = await axios.post(`http://localhost:1337/museumobjects`, object);
          const { id } = response.data;
          const files = await readdir(path.join(...imagesPath));
          for (let file of files) {
              if (file.startsWith(object.inventoryNumber)) {
                  const bodyFormData = {
                      'refId': id,
                      'ref': 'museumobject',
                      'files': fs.createReadStream(path.join(...imagesPath, file)),
                      'field': 'image'
                  };
                  request.post({url:`http://localhost:1337/upload`, formData: bodyFormData}, ()=>{});
              }
          }
      } catch (e) {
          console.log(e);
      }
  }
})();

