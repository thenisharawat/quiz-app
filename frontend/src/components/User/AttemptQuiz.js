

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuizzes } from '../Redux/actions/quizActions';
import './AttemptQuiz.css'; 

const AttemptQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const dispatch = useDispatch();

    // Fetch quizzes from the Redux store
    const quizzes = useSelector(state => state.quiz.quizzes);
    const loading = useSelector(state => state.quiz.loading);
    const error = useSelector(state => state.quiz.error);

    useEffect(() => {
        dispatch(getQuizzes()); // Action to get quizzes
    }, [dispatch]);

    const handleQuizSelect = (quizId) => {
        const quiz = quizzes.find(q => q._id === quizId);
        setSelectedQuiz(quiz);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="attempt-quiz-container">
            <h2>Attempt Quiz</h2>
            {quizzes && quizzes.length > 0 ? (
                <div className="quiz-list">
                    <h3>Select a Quiz</h3>
                    <ul>
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item">
                                <button onClick={() => handleQuizSelect(quiz._id)}>
                                    {quiz.title}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {selectedQuiz && (
                        <div className="quiz-details">
                            <h3>{selectedQuiz.title}</h3>
                            <p>{selectedQuiz.description}</p>

                        </div>
                    )}
                </div>
            ) : (
                <div className="no-quizzes">No quizzes available</div>
            )}
        </div>
    );
};

export default AttemptQuiz;

