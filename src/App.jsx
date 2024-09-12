import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "./components/Header";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import TakeQuiz from "./components/TakeQuiz";
import Result from "./components/Result";

const App = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    questions: [{ question: '', options: ['', '', '', ''] }],
  });

  // Save quiz to localStorage whenever the quiz state changes
  const updateQuiz = (newQuiz) => {
    setQuiz(newQuiz);
    localStorage.setItem('quiz', JSON.stringify(newQuiz)); // Save individual quiz temporarily (you could modify this behavior as needed)
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/create" 
          element={<CreateQuiz quiz={quiz} setQuiz={updateQuiz} />} 
        />
        <Route 
          path="/take" 
          element={<TakeQuiz />} 
        />
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </Router>
  );
};

export default App;
