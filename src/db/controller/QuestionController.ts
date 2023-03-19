const mongoose = require('mongoose');
import MongoCollection from "../collections/collection";



async function getAnswersForId(id: string) {

  try {
    const db = mongoose.connection.db;
    const answerCollection = await db.collection(MongoCollection.Answers)
    let result = await answerCollection.find({ question_id: id }).toArray();
    return result;
  } catch (error) {
    console.log(error);

  }
}


async function addAnswer(question_id: string) {

  try {
    const db = mongoose.connection.db;
    const answerCollection = await db.collection(MongoCollection.Answers)


  }

}



export default getAnswersForId;