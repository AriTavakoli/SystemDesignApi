import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$question_id',
      'answersArray': {
        '$push': {
          'k': {
            '$toString': '$id'
          },
          'v': {
            'id': '$id',
            'answer_id': '$id',
            'body': '$body',
            'date_written': '$date_written',
            'answerer_name': '$answerer_name',
            'answerer_email': '$answerer_email',
            'reported': '$reported',
            'helpful': '$helpful'
          }
        }
      }
    }
  }, {
    '$addFields': {
      'answers': {
        '$arrayToObject': '$answersArray'
      }
    }
  }, {
    '$project': {
      'answersArray': 0
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('testDb').collection('answers_p2');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();