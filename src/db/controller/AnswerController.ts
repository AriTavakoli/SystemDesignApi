const mongoose = require('mongoose');
import MongoCollection from "../collections/collection";


module.exports = {
  getQuery
}

async function getQuery(id) {

  try {
    const db = mongoose.connection.db;
    const collection = await db.collection(MongoCollection.Answers)
    let result = await collection.find({question_id : id.toString()}).limit(5).toArray()

  } catch (error) {
    console.log(error);

  }

}
