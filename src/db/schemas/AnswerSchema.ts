const mongoose = require('mongoose');
const { Schema } = mongoose;




const AnswerSchema = new Schema({
  id: { type: String, required: true },
  answer_id: { type: String, required: true },
  body: { type: String, required: true },
  date_written: { type: Date, required: true },
  answerer_name: { type: String, required: true },
  answerer_email: { type: String, required: true },
  reported: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 }
})


module.exports = mongoose.model('agg_answers_json', AnswerSchema);