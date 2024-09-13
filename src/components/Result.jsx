import React, { useEffect, useState } from 'react';
import './Result.css';

const Result = () => {
  const [results, setResults] = useState([]);

  //to retrive results
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setResults(storedQuizzes.filter(quiz => quiz.completed).slice(-6));
  }, []);

  return (
    <div className="result">
      <h1>Your Quiz Results</h1>
      {results.length === 0 ? (
        <p>No results available</p>
      ) : (
        <ul className="result-list">
          {results.map((quiz, index) => (
            <li key={index} className="result-card">
              <h2>{quiz.title}</h2>
              <p>Score: {quiz.score}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Result;
