import React, { useState } from "react";

const AddQuiz = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const handleTextField = (e, setter) => {
    setter(e.target.value);
  };

  const handleAddQuiz = () => {
    const quizData = {
      question,
      options: [option1, option2, option3, option4],
      correctOption,
    };

    console.log("Quiz Data:", quizData);

    // Here you can make a POST request to your API to save the quiz data
    fetch("http://localhost:9000/api/add-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Quiz added successfully') {
          alert('Quiz added successfully');
          // Reset the form fields
          setQuestion('');
          setOption1('');
          setOption2('');
          setOption3('');
          setOption4('');
          setCorrectOption('');
        } else {
          alert(data.message); // Show error message
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'gray'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          width: '50%',
          backgroundColor: 'lightgray',
          padding: 40,
          borderRadius: 8,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
        <h2 style={{ textAlign: 'center' }}>Add Question</h2>
        
        <label>
          <p>Question</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter your question"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <label>
          <p>First option</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter first option"
            onChange={(e) => handleTextField(e, setOption1)}
            value={option1}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <label>
          <p>Second option</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter second option"
            onChange={(e) => handleTextField(e, setOption2)}
            value={option2}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <label>
          <p>Third option</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter third option"
            onChange={(e) => handleTextField(e, setOption3)}
            value={option3}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <label>
          <p>Fourth option</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter fourth option"
            onChange={(e) => handleTextField(e, setOption4)}
            value={option4}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <label>
          <p>Correct option</p>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter correct option (1-4)"
            onChange={(e) => setCorrectOption(e.target.value)}
            value={correctOption}
            style={{ width: '100%', padding: 10, borderRadius: 5 }}
          />
        </label>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <button
            className="signUpButton"
            type="button"
            onClick={handleAddQuiz}
            style={{
              backgroundColor: '#007BFF',
              color: '#ffffff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: 5,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
