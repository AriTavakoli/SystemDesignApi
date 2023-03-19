// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const photoSchema = new Schema({
//   _id: false,
//   id: Number,
//   url: String,
// });

// const answerSchema = new Schema({
//   answer_id: Number,
//   body: String,
//   date: String,
//   answerer_name: String,
//   answerer_email: String,
//   helpfulness: Number,
//   reported: Boolean,
//   photos: [photoSchema],
// });

// const questionSchema = new Schema({
//   question_id: Number,
//   product_id: Number,
//   body: String,
//   date_written: String,
//   asker_name: String,
//   asker_email: String,
//   reported: Boolean,
//   helpfulness: Number,
//   answers: [answerSchema],
// });

// const productSchema = new Schema({
//   product_id: Number,
//   questions: [questionSchema],
// });


// const Product = mongoose.model('Product', productSchema);
// const Question = mongoose.model('Question', questionSchema);
// const Answer = mongoose.model('Answer', answerSchema);

// productSchema.index({ product_id: 1 });
// questionSchema.index({ question_id: 1, product_id: 1 });
// answerSchema.index({ answer_id: 1, question_id: 1 });

// // const answers = await Answer.find({ question_id: someQuestionId }).populate('question_id');

// // const questions = await Question.find({ product_id: someProductId }, 'body asker_name');
// // const pageSize = 10;
// // const pageNumber = 2;
// // const questions = await Question.find({ product_id: someProductId }).skip(pageSize * (pageNumber - 1)).limit(pageSize);
