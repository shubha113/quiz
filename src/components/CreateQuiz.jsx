import React from "react";
import "./CreateQuiz.css";

const CreateQuiz = ({ quiz, setQuiz }) => {
  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };
  //handle adding the new questions
  const handleQuestionChange = (index, e) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].question = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };
  //handle adding the new options
  const handleOptionChange = (qIndex, oIndex, e) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options[oIndex] = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle setting the correct answer
  const handleCorrectAnswerChange = (qIndex, e) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].correctAnswer = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };
  //Handle adding new empty question, options, correct answer
  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };
  //handling the submition of quiz questions
  const handleSubmit = (e) => {
    e.preventDefault();

    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    const newQuiz = {
      title: quiz.title,
      questions: quiz.questions,
      completed: false,
    };

    existingQuizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));

    setQuiz({
      title: "",
      questions: [
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  return (
    <div className="create-quiz">
      <div className="form-container">
        <h1>Create Your Quiz!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Quiz Title:</label>
            <input
              type="text"
              id="title"
              value={quiz.title}
              onChange={handleTitleChange}
              placeholder="Enter quiz title"
              required
            />
          </div>
          {quiz.questions.map((q, questionIndex) => (
            <div className="form-group" key={questionIndex}>
              <label htmlFor={`question-${questionIndex}`}>
                Question {questionIndex + 1}:
              </label>
              <input
                type="text"
                id={`question-${questionIndex}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(questionIndex, e)}
                placeholder="Enter question"
                required
              />
              <div className="options">
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-group">
                    <label htmlFor={`option-${questionIndex}-${optionIndex}`}>
                      Option {optionIndex + 1}:
                    </label>
                    <input
                      type="text"
                      id={`option-${questionIndex}-${optionIndex}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor={`correct-answer-${questionIndex}`}>
                  Correct Answer:
                </label>
                <input
                  type="text"
                  id={`correct-answer-${questionIndex}`}
                  value={q.correctAnswer || ""}
                  onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}
                  placeholder="Enter correct answer"
                  required
                />
              </div>
              <button type="button" onClick={handleAddQuestion}>
                Add Another Question
              </button>
            </div>
          ))}
          <button type="submit">Save Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
