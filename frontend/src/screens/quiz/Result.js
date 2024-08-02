import React from 'react';

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result">
      <h2>Your Score: {score} out of {totalQuestions}</h2>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
};

export default Result;
