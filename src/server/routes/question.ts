const express = require('express')
const answers = express.Router()
const mongoose = require('mongoose');
import MongoCollection from "src/db/collections/collection";
const AnswerController = require('../../db/controller/q');



// answers.use((req, res, next) => {
//   next()
// })
//



answers.get('/', async (req, res) => {



  let answer = await AnswerController.getQuery();



  res.send(answer)
})



export default answers
//

//








async function measureQueryTime(numQueries, randMax) {

  // measure the time for the specified number of queries
  let totalQueryTime = 0;
  for (let i = 0; i < numQueries; i++) {
    // generate a random product_id
    const rand = Math.floor(Math.random() * randMax) + 1;


    // run the query and measure the time
    const startTime = Date.now();
    const question = await Question.find({ product_id: rand });
    const queryTime = Date.now() - startTime;

    // add the query time to the total
    totalQueryTime += queryTime;

    console.log(rand);
    console.log(`Query ${i + 1}: ${queryTime} ms  |  productId: ${rand}`);
  }

  // calculate the average query time
  const avgQueryTime = totalQueryTime / numQueries;
  console.log(`Average query time: ${avgQueryTime} ms | ${numQueries} queries | ${randMax} max productId`);

  // close the database connection
}