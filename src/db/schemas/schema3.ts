import MongoCollection from "../collections/collection";

const mongoose = require('mongoose');
const { Schema } = mongoose;


// TODO: should I be using _id: false for the photoSchema?
const answerSchema = new Schema({
  id: { type: String, required: true },
  answer_id: { type: String, required: true },
  body: { type: String, required: true },
  date_written: { type: Date, required: true },
  answerer_name: { type: String, required: true },
  answerer_email: { type: String, required: true },
  reported: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 }

  // question_id: { type: Number, ref: 'Question' },
  // body: String,
  // date: String,
  // answerer_name: String,
  // answerer_email: String,
  // helpfulness: Number,
  // reported: Boolean,
});

// const Answer = mongoose.model('Answer', answerSchema, MongoCollection.Answers);

//
const questionSchema = new Schema({
  _id: Number,
  // product_id: { type: Number, ref: 'Product' },
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpfulness: Number,
  // answers: [answerSchema],
});

const Question = mongoose.model('Question', questionSchema, MongoCollection.Questions);


const photoSchema = new Schema({
  _id: Number,
  answer_id: { type: Number, ref: 'Answer' },
  url: String,
});


const Photo = mongoose.model('Photo', photoSchema);


const productSchema = new Schema({
  _id: Number,
  questions: [questionSchema],
});

const Product = mongoose.model('Product', productSchema);



// export { Question, Answer, Product, Photo }


// productSchema.index({ product_id: 1 });
// questionSchema.index({ question_id: 1, product_id: 1 });
// answerSchema.index({ answer_id: 1, question_id: 1 });
