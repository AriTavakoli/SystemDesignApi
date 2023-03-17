import fs from 'fs';
import csvtojson from 'csvtojson';
import dotenv from 'dotenv';

dotenv.config();

const filePathA = process.env.ETL_DATA_FILE_PATH_A;
const filePathQ = process.env.ETL_DATA_FILE_PATH_Q;
const filePathPhotos = process.env.ETL_DATA_FILE_PATH_PHOTOS;

const files = [filePathA, filePathQ, filePathPhotos];

files.forEach((filePath) => {
  let isFirstLine = true;
  const readStream = fs.createReadStream(filePath);

  csvtojson()
    .fromStream(readStream)
    .subscribe(
      (jsonObj) => {
        if (isFirstLine) {
          console.log(jsonObj);
          isFirstLine = false;
        }
        readStream.close();
      },
      (err) => {
        console.error(`Error parsing file: ${err.message}`);
      },
      () => {
        console.log(`Finished parsing the CSV file: ${filePath}`);
      },
    );
});
