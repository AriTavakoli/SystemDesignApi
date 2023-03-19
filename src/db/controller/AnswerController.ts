const mongoose = require('mongoose');
import MongoCollection from "../collections/collection";


module.exports = {
  getQuery
}

async function getQuery() {
  
  try {


    const db = mongoose.connection.db;

    const collection = await db.collection(MongoCollection.Answers)

    let result = await collection.find({question_id : '1'}).limit(5).toArray()

    console.log(result);


  } catch (error) {
    console.log(error);

  }

}
