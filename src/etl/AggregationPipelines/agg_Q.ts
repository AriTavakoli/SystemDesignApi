import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$product_id',
      'questions': {
        '$push': {
          'k': {
            '$toString': '$id'
          },
          'v': '$$ROOT'
        }
      }
    }
  }, {
    '$project': {
      '_id': 0,
      'product_id': '$_id',
      'questions': {
        '$arrayToObject': '$questions'
      }
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('testDb').collection('questions');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();


// [
//   {
//     $group: {
//       _id: "$product_id",
//       questions: {
//         $push: {
//           k: {
//             $toString: "$id",
//           },
//           v: "$$ROOT",
//         },
//       },
//     },
//   },
//   {
//     $project:
//       /**
//        * specifications: The fields to
//        *   include or exclude.
//        */
//       {
//         _id: 0,
//         product_id: "$_id",
//         questions: {
//           $arrayToObject: "$questions",
//         },
//       },
//   },
// ]