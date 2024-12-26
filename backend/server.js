const express = require('express');
const connectDB = require('./config/db');
const Question = require('./model/Question');

const app = express();
app.use(express.json());

connectDB();

// API endpoint to get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
