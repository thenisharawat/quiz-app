import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import './styles.css'
import axios from 'axios';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Lisbon', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the capital of France2?',
    answerOptions: [
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Lisbon', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the capital of France3?',
    answerOptions: [
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Lisbon', isCorrect: false },
    ],
  },
  // Add more questions as needed
];
const QuizContainer = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timer, setTimer] = useState(8); 


  const postData = async () => {
    const url = '';
    const token = 'YOUR_ACCESS_TOKEN'; 
  
    const data = {
      key1: 'value1',
      key2: 'value2',
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        },
      });
  
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error while making the API call:', error);
    }
  };



  // useEffect(async () => {
  //   postData()
  // },[])

  useEffect(() => {
    let interval = null;

    if (timer > 0 && !isQuizFinished) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer, isQuizFinished]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setTimer(8); 
      } else {
        setIsQuizFinished(true);
      }
    }, 2000); 
  };

  return (
    <div className="quiz-container">
      {isQuizFinished ? (
        <Result score={score} totalQuestions={questions.length} />
      ) : (
        <div>
          <h3>Time left: {timer}s</h3>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerOptionClick={handleAnswerOptionClick}
          />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
