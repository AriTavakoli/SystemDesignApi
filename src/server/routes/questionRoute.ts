const express = require('express')
const question = express.Router()
const mongoose = require('mongoose');
import MongoCollection from "src/db/collections/collection";
import { Request, Response } from "express"
import getAnswersForId from "../../db/controller/QuestionController";



// qa/questions/

question.get('/:question_id/answers', async (req: Request, res: Response) => {
  try {
    const { question_id } = req.params;
    let answers = await getAnswersForId(question_id);

    console.log(answers, 'answers');
    res.send(answers);

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




})


export default question;