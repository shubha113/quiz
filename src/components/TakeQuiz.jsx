import React, { useEffect, useState } from 'react';
import './TakeQuiz.css';

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const [quizStatus, setQuizStatus] = useState('not_started');
  const [userScore, setUserScore] = useState(null);

  // Load quizzes from localStorage on component mount
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const incompleteQuizzes = storedQuizzes.filter(quiz => !quiz.completed);
    setQuizzes(incompleteQuizzes);
  }, []);

  // To show the time remaining to complete 1 quizz
  useEffect(() => {
    let interval;
    if (quizStatus === 'in_progress' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [quizStatus, timer]);

  // This function initializes the quiz when the user starts it.
  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimer(60);
    setQuizStatus('in_progress');
  };

  // It handles the selection of an option during the quiz.
  const handleOptionChange = (optionText) => {
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = optionText;
      return newAnswers;
    });
  };

  //to check if their are more questions remaining to complete
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimer(60); 
    } else {
      calculateScore();
    }
  };

  //to calculate score
  const calculateScore = () => {
    const score = userAnswers.reduce((totalScore, answer, index) => {
      const correctAnswer = currentQuiz.questions[index].correctAnswer; 
      if (answer === correctAnswer) {
        totalScore += 1;
      }
      return totalScore;
    }, 0);

    const totalQuestions = currentQuiz.questions.length;
    const scorePercentage = Math.round((score / totalQuestions) * 100);

    // Update the score in the current quiz object
    const updatedQuiz = { ...currentQuiz, completed: true, score: scorePercentage };
    const updatedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Save the updated quizzes back to localStorage
    localStorage.setItem('quizzes', JSON.stringify([...updatedQuizzes.filter(q => q.title !== currentQuiz.title), updatedQuiz]));

    // Set score to display
    setUserScore(scorePercentage);
    setQuizStatus('completed');
  };

  return (
    <div className="take-quiz">
      {quizStatus === 'not_started' ? (
        <div className="quiz-section">
          <h1>Avilable Quiz</h1>
          <div className="quiz-categories">
            {quizzes.length === 0 ? (
              <p>No quizzes available</p>
            ) : (
              quizzes.map((quiz, index) => (
                <div key={index} onClick={() => startQuiz(quiz)} className="quiz-category">
                  {quiz.title}
                </div>
              ))
            )}
          </div>
        </div>
      ) : quizStatus === 'in_progress' && currentQuiz ? (
        <div className="quiz-card">
          <h2>{currentQuiz.title}</h2>
          <p>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
          <p>Time Remaining: {timer}s</p>
          <div className="question">
            <p>{currentQuiz.questions[currentQuestionIndex].question}</p>
            <div className="options">
              {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option" onClick={() => handleOptionChange(option)}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="quiz-option"
                    checked={userAnswers[currentQuestionIndex] === option}
                    readOnly
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
            <button onClick={handleNextQuestion} className="next-btn">Submit Question</button>
          </div>
        </div>
      ) : quizStatus === 'completed' ? (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>Your score: {userScore}%</p> 
          <button onClick={() => setQuizStatus('not_started')} className="next-btn">Back to Categories</button>
        </div>
      ) : null}
    </div>
  );
};

export default TakeQuiz;
