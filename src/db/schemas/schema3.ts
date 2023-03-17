
const mongoose = require('mongoose');
const { Schema } = mongoose;



const productSchema = new Schema({
  _id: Number,
  questions: [questionSchema],
});


// TODO: should I be using _id: false for the photoSchema?
const answerSchema = new Schema({
  _id: Number,
  question_id: { type: Number, ref: 'Question' },
  body: String,
  date: String,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Number,
  reported: Boolean,
});

const questionSchema = new Schema({
  _id: Number,
  product_id: { type: Number, ref: 'Product' },
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpfulness: Number,
  answers: [answerSchema],
});

const photoSchema = new Schema({
  _id: Number,
  answer_id: { type: Number, ref: 'Answer' },
  url: String,
});
productSchema.index({ product_id: 1 });
questionSchema.index({ question_id: 1, product_id: 1 });
answerSchema.index({ answer_id: 1, question_id: 1 });
