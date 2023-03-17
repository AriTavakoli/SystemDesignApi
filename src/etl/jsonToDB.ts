const fs = require('fs');
const readline = require('readline');
const { Transform } = require('stream');
require('dotenv').config();

const filePathA = process.env.ETL_DATA_FILE_PATH_A;
const filePathQ = process.env.ETL_DATA_FILE_PATH_Q;
const filePathPhotos = process.env.ETL_DATA_FILE_PATH_PHOTOS;
const outputFile = 'output.json'

// Initialize the data structure
const data = { products: {} };

// Create a JSON line parser transform stream
const parseJSONLine = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    const line = chunk.toString().trim();
    if (line) {
      try {

        const obj = JSON.parse(line);
console.log(obj, 'obj');
        this.push(obj);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    }
    callback();
  }
});

async function processFiles() {
  const files = [filePathQ, filePathA, filePathPhotos];

  for (const file of files) {
    const readStream = fs.createReadStream(file);
    const lineReader = readline.createInterface({ input: readStream.pipe(parseJSONLine) });

    for await (const obj of lineReader) {
      switch (file) {
        case filePathQ:
          processQuestion(obj);
          break;
        case filePathA:
          processAnswer(obj);
          break;
        case filePathPhotos:
          processPhoto(obj);
          break;
      }
    }
  }

  // Write the result to a file
  fs.writeFile(outputFile, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Successfully written to', outputFile);
    }
  });
}

function processQuestion(question) {
  if (!data.products[question.product_id]) {
    data.products[question.product_id] = { questions: {} };
  }

  data.products[question.product_id].questions[question.id] = {
    body: question.body,
    date_written: question.date_written,
    asker_name: question.asker_name,
    asker_email: question.asker_email,
    reported: question.reported === '0' ? false : true,
    helpfulness: parseInt(question.helpful),
    answers: {},
  };
}

function processAnswer(answer) {
  const question = data.products[answer.product_id]?.questions[answer.question_id];
  if (!question) return;

  question.answers[answer.id] = {
    body: answer.body,
    date: answer.date_written,
    answerer_name: answer.answerer_name,
    answerer_email: answer.answerer_email,
    helpfulness: parseInt(answer.helpful),
    reported: answer.reported === '0' ? false : true,
    photos: {},
  };
}

function processPhoto(photo) {
  const question = data.products[photo.product_id]?.questions[photo.question_id];
  const answer = question?.answers[photo.answer_id];
  if (!answer) return;

  answer.photos[photo.id] = { url: photo.url };
}

processFiles();