import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('/api/questions');
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>IndiaBix Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
