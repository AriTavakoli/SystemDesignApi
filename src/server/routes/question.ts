const express = require('express')
const answers = express.Router()
const mongoose = require('mongoose');
import MongoCollection from "src/db/collections/collection";
const AnswersController = require('../../db/controller/AnswerController')


// answers.use((req, res, next) => {
//   next()
// })
//



answers.get('/', async (req, res) => {


  measureQueryTime(1000, 1000)


  res.send('Hello World')


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
    const question = await  AnswersController.getQuery()

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