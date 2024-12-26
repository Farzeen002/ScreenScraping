const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  source: { type: String, default: 'IndiaBix' },
});

module.exports = mongoose.model('Question', QuestionSchema);
