const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [
    {
      _id: false,
      id: Number,
      url: String,
    },
  ],
});

const questionSchema = new Schema({
  question_id: Number,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpfulness: Number,
  answers: [answerSchema],
});

const productSchema = new Schema({
  product_id: Number,
  questions: [questionSchema],
});

const Product = mongoose.model('Product', productSchema);

productSchema.index({ product_id: 1 });
questionSchema.index({ question_id: 1, product_id: 1 });
answerSchema.index({ answer_id: 1 });