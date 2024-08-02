import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../Redux/actions/quizActions';
import './AddQuiz.css'; // Importing a separate CSS file for styling

const AddQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({ questionText: '', options: '', correctAnswer: '' });
    const dispatch = useDispatch();

    const handleAddQuestion = () => {
        if (currentQuestion.questionText && currentQuestion.options && currentQuestion.correctAnswer) {
            setQuestions([...questions, {
                questionText: currentQuestion.questionText,
                options: currentQuestion.options.split(',').map(option => option.trim()),
                correctAnswer: currentQuestion.correctAnswer
            }]);
            setCurrentQuestion({ questionText: '', options: '', correctAnswer: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addQuiz({ title, description, timer, questions }));
    };

    return (
        <div className="add-quiz-container">
            <h2>Add New Quiz</h2>
            <form onSubmit={handleSubmit} className="add-quiz-form">
                <div className="form-group">
                    <label htmlFor="title">Quiz Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter quiz title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter quiz description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timer">Timer (minutes):</label>
                    <input
                        type="number"
                        id="timer"
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                        placeholder="Enter quiz duration"
                        required
                    />
                </div>
                <div className="question-section">
                    <h3>Add Questions</h3>
                    <div className="form-group">
                        <label htmlFor="question">Question:</label>
                        <input
                            type="text"
                            id="question"
                            value={currentQuestion.questionText}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                            placeholder="Enter question text"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="options">Options (comma separated):</label>
                        <input
                            type="text"
                            id="options"
                            value={currentQuestion.options}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: e.target.value })}
                            placeholder="Enter options separated by commas"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correctAnswer">Correct Answer:</label>
                        <input
                            type="text"
                            id="correctAnswer"
                            value={currentQuestion.correctAnswer}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                            placeholder="Enter the correct answer"
                            required
                        />
                    </div>
                    <button type="button" onClick={handleAddQuestion} className="btn btn-add">Add Question</button>
                    <div className="questions-list">
                        {questions.length > 0 && (
                            <ul>
                                {questions.map((q, index) => (
                                    <li key={index}>
                                        <strong>Q{index + 1}: </strong>{q.questionText} <br />
                                        <strong>Options:</strong> {q.options.join(', ')} <br />
                                        <strong>Answer:</strong> {q.correctAnswer}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button type="submit" className="btn btn-submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default AddQuiz;
