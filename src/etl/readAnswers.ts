const fs = require('fs');
const readline = require('readline');
const csvtojson = require('csvtojson');
const ParseJSON = require('./ParseJSON');

const JSONStream = require('JSONStream');


require('dotenv').config();

const answers = process.env.ETL_DATA_FILE_PATH_A;
const questions = process.env.ETL_DATA_FILE_PATH_Q;
const photos = process.env.ETL_DATA_FILE_PATH_PHOTOS;


function parseJsonFile(filePath) {
  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const parser = JSONStream.parse('*');

  parser.on('data', (data) => {
    console.log(data);
  });

  stream.pipe(parser);
}

parseJsonFile(answers);

//

// ParseJSON.search(answers, 'question_id', '1')
//   .then((items) => {
//     console.log(items);
//   })
//   .catch((err) => {
//     console.error(err);
//   });


// ParseJSON.search(questions, 'product_id', '1')
//   .then((items) => {
//     console.log(items);
//   })
//   .catch((err) => {
//     console.error(err);
//   }
//   );
