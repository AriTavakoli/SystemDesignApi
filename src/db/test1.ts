import { connectToMongoDB, disconnectFromMongoDB } from "./connection";
import MongoCollection from "./collections/collection";
import ExtendedCollection from "./util";
const mongoose = require('mongoose');
require('dotenv').config();




async function init() {

  await connectToMongoDB(); // Connect to MongoDB database

  const db = mongoose.connection.db;

  // const query = { ['356126']: { $exists: true } };

  const collection = await db.collection(MongoCollection.Answers)



  // await collection.createIndex({ '$**': 1 });
  console.time('test')

 let result = await collection.find({question_id : '1'}).limit(5).toArray()

 console.log(result);
  // const collection2 = await db.collection(MongoCollection.Photos).find().sort({_id: -1}).limit(5).toArray();

  console.timeEnd('test')

  // console.log(collection2);

  await disconnectFromMongoDB(); // Disconnect from MongoDB database


}


init();

