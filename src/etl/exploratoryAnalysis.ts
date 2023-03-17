const fs = require('fs');
const readline = require('readline');
const csvtojson = require('csvtojson');
require('dotenv').config();

const filePathA = process.env.ETL_DATA_FILE_PATH_A;
const filePathQ = process.env.ETL_DATA_FILE_PATH_Q;
const filePathPhotos = process.env.ETL_DATA_FILE_PATH_PHOTOS;

const readStream = fs.createReadStream(filePathQ);

const writeStream = fs.createWriteStream('output.json');

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

let lineCount = 0;
const LIMIT = 20; // set the limit to 20 items

csvtojson()
  .fromStream(readStream)
  .subscribe((jsonObj) => {
    if (lineCount < LIMIT) { // check if we've reached the limit
      console.log(jsonObj);
      let product = {
        [jsonObj.question_id]: 1
      };


      let question = jsonObj.questionroduct_id;
      let answer = jsonObj.answer_body;
      writeStream.write(JSON.stringify(product) + '\n');
      lineCount++; // increment the line count
    } else {
      rl.close(); // close the readline interface to stop processing the file
    }
  }, (err) => {
    console.error(`Error parsing file: ${err.message}`);
  }, () => {
    console.log('Finished parsing the CSV file.');
    writeStream.end();
  });

rl.on('error', (err) => {
  console.error(`Error reading file: ${err.message}`);
});

writeStream.on('error', (err) => {
  console.error(`Error writing file: ${err.message}`);
});
