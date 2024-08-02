import React, { useEffect, useState } from "react";
import QuizContainer from "../quiz";


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
      questionText: 'What is the capital of France1?',
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
  ];

const DashBord = () => {
    const [data, setData] = useState({});

   useEffect(() => {
    let count = 0;
    if( questions.length !== count){
  
        setInterval(() => {
            questions.forEach((val) => {
                setData(val)
                count ++;
            })
        }, 2000)
    }

   }, [data]) 

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
      }}
    >
      <div
      >
       <QuizContainer data={data} />
      </div>
    </div>
  );
};

export default DashBord;
