const fs = require('fs');
const csvtojson = require('csvtojson');
const cliProgress = require('cli-progress');
require('dotenv').config();

const filePathQ = process.env.ETL_DATA_FILE_PATH_Q;
const filePathA = process.env.ETL_DATA_FILE_PATH_A;
const filePathPhotos = process.env.ETL_DATA_FILE_PATH_PHOTOS;


const readStream = fs.createReadStream(filePathPhotos);
const writeStream = fs.createWriteStream("C://Desktop1//ProfileData//JSON//photos.json");

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let lineCount = 0;

csvtojson()
  .fromStream(readStream)
  .on('data', (jsonObj) => {

   const jsonString = JSON.stringify(JSON.parse(jsonObj)) + '\n';
    writeStream.write(jsonString, 'utf8');

    lineCount++;
    if (lineCount % 10000 === 0) { // update progress bar every 10000 lines
      progressBar.update(lineCount);
    }
  })
  .on('done', () => {
    console.log(`Finished parsing the CSV file. ${lineCount} lines processed.`);
    writeStream.end();
    progressBar.stop();
  })
  .on('error', (err) => {
    console.error(`Error parsing file: ${err.message}`);
  });

writeStream.on('error', (err) => {
  console.error(`Error writing file: ${err.message}`);
});

progressBar.start(fs.statSync(filePathQ).size, 0);
