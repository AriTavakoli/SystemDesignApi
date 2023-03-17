const mongoimport = require('mongoimport');
const path = require('path');
const { connectToMongoDB, disconnectFromMongoDB } = require('./index')




connectToMongoDB();

const options = {
  fields: ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful'],
  drop: true,
  database: 'myDatabase',
  collection: 'myCollection',
  type: 'csv',
  headerline: true,
  file: path.join(__dirname, 'myFile.csv')
};

mongoimport(options, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});

disconnectFromMongoDB();