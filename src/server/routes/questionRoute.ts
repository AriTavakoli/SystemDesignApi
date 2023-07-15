const express = require('express')
const question = express.Router()
const mongoose = require('mongoose');
import MongoCollection from "src/db/collections/collection";
import { Request, Response } from "express"
import getAnswersForId from "../../db/controller/QuestionController";
const AnswersController = require('../../db/controller/AnswerController')
const colors = require('colors');
// qa/questions/

question.get('/:question_id/answers', async (req: Request, res: Response) => {
  try {
    const { question_id } = req.params;
    let answers = await getAnswersForId(question_id);

    console.log(answers, 'answers');
    res.send(answers);


    measureQueryTime(5000, 5000)

    res.status(200)
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }

});

question.get('/:question_id/answers/:page', async (req: Request, res: Response) => {

  try {
    const { question_id, page } = req.params;
    let answers = getAnswersForId(question_id);
    res.status(200).json(answers);
  } catch (error) {
    throw new Error(error);
  }

});

question.get('/:question_id/answers/:page/:count', async (req: Request, res: Response) => {

  try {
    const { question_id, page, count } = req.params;
    let answers = getAnswersForId(question_id);
    res.status(200).json(answers);
  } catch (error) {
    throw new Error(error);
  }
});


question.post('/', async (req: Request, res: Response) => {

  try {
    const { name, email, product_id, body } = req.body;
    if (name && email && product_id && body) {
      console.log(name, email, product_id, body);
    }
    res.send('yo')
  }

  catch (error) {
    throw new Error(error);
  }

});






async function measureQueryTime(numQueries, randMax) {
  // start the timer
  const startTime = Date.now();

  // measure the time for the specified number of queries
  let totalQueryTime = 0;
  for (let i = 0; i < numQueries; i++) {
    // generate a random product_id
    const rand = Math.floor(Math.random() * randMax) + 1;

    // run the query and measure the time
    const queryStartTime = Date.now();
    const question = await AnswersController.getQuery(rand)

    const queryTime = Date.now() - queryStartTime;

    // add the query time to the total
    totalQueryTime += queryTime;

    // print the query time and product ID in color
    if (process.env.CONSOLE_QUERIES === 'true') {
      console.log(`Query ${i + 1}: ${queryTime.toString().green} ms  |  productId: ${rand.toString().blue}`);
    }

  }

  console.log();
  console.log('-------------------------------------------------------------------------'.magenta);
  // calculate the average query time
  const avgQueryTime = totalQueryTime / numQueries;
  console.log(`Average query time: ${avgQueryTime.toString().yellow} ms | ${numQueries} queries | ${randMax} max productId`);
  console.log('-------------------------------------------------------------------------'.magenta);


  // calculate the total duration and output it
  const endTime = Date.now();
  const totalDuration = endTime - startTime;
  console.log(`Total duration: ${totalDuration.toString().yellow} ms for ${numQueries} queries`);

  // close the database connection
}




export default question;