import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$answer_id',
      'documents': {
        '$push': {
          '_id': '$_id',
          'id': '$id',
          'answer_id': '$answer_id',
          'url': '$url'
        }
      }
    }
  }, {
    '$project': {
      'data': {
        '$arrayToObject': [
          [
            {
              'k': {
                '$toString': '$_id'
              },
              'v': {
                '$arrayElemAt': [
                  '$documents', 0
                ]
              }
            }
          ]
        ]
      }
    }
  }, {
    '$replaceRoot': {
      'newRoot': '$data'
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('testDb').collection('answers_photos');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();


[
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$answer_id",
        documents: {
          $push: {
            _id: "$_id",
            id: "$id",
            answer_id: "$answer_id",
            url: "$url",
          },
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        data: {
          $arrayToObject: [
            [
              {
                k: {
                  $toString: "$_id",
                },
                v: {
                  $arrayElemAt: ["$documents", 0],
                },
              },
            ],
          ],
        },
      },
  },
  {
    $replaceRoot:
      /**
       * replacementDocument: A document or string.
       */
      {
        newRoot: "$data",
      },
  },
]


[
  {
    '$group': {
      '_id': '$answer_id',
      'documents': {
        '$push': {
          '_id': '$_id',
          'id': '$id',
          'answer_id': '$answer_id',
          'url': '$url'
        }
      }
    }
  }, {
    '$project': {
      'data': {
        '$arrayToObject': [
          [
            {
              'k': {
                '$toString': '$_id'
              },
              'v': {
                '$arrayElemAt': [
                  '$documents', 0
                ]
              }
            }
          ]
        ]
      }
    }
  }, {
    '$replaceRoot': {
      'newRoot': '$data'
    }
  }
]