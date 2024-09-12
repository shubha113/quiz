import React from 'react';
import './Home.css';
import Header from './Header';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to Fun Quiz Platform!</h1>
        <p>Test your knowledge or create a new quiz for your friends to play.</p>
      </div>
    </div>
  );
};

export default Home;
