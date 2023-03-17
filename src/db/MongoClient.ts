const { MongoClient } = require('mongodb');
const csvtojson = require('csvtojson');
require('dotenv').config();

const answers = process.env.ETL_DATA_FILE_PATH_A;
const questions = process.env.ETL_DATA_FILE_PATH_Q;
const photos = process.env.ETL_DATA_FILE_PATH_PHOTOS;

async function main() {
  const client = new MongoClient(process.env.URI);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected');

    const db = client.db('testDb');
    const collection = db.collection('questions');

    const pipeline = [
      {
        '$group': {
          '_id': '$product_id',
          'questions': {
            '$push': {
              'id': '$id',
              'body': '$body',
              'date_written': '$date_written',
              'asker_name': '$asker_name',
              'asker_email': '$asker_email',
              'reported': '$reported',
              'helpful': '$helpful'
            }
          }
        }
      }, {
        '$lookup': {
          'from': 'answers',
          'localField': 'id',
          'foreignField': 'question_id',
          'as': 'answers'
        }
      }
    ];

    // Execute the pipeline and add the results to an existing collection
    const targetCollection = db.collection('aggregated_questions');
    const result = await collection.aggregate(pipeline).toArray();
    if (result.length > 0) {
      await targetCollection.insertMany(result);
      console.log(`Aggregated data added to collection "aggregated_questions".`);
    } else {
      console.log(`No data was found by the aggregation pipeline.`);
    }

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
