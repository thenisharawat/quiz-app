import React from 'react';

const Question = ({ question, onAnswerOptionClick }) => {
  return (
    <div className="question">
      <h2>{question.questionText}</h2>
      <div className="answer-options">
        {question.answerOptions.map((option, index) => (
          <button key={index} onClick={() => onAnswerOptionClick(option.isCorrect)}>
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
