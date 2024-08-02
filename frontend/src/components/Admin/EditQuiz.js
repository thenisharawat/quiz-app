import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById, updateQuiz } from '../../Redux/actions/quizActions';

const EditQuiz = ({ match, history }) => {
    const dispatch = useDispatch();
    const { quiz } = useSelector(state => state.quiz);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        dispatch(getQuizById(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (quiz) {
            setTitle(quiz.title);
            setDescription(quiz.description);
            setQuestions(quiz.questions);
        }
    }, [quiz]);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateQuiz({ id: quiz._id, title, description, questions }, history));
    };

    return (
        <div>
            <h1>Edit Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Questions</label>
                    {questions.map((question, qIndex) => (
                        <div key={qIndex}>
                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                            />
                            <div>
                                {question.options.map((option, oIndex) => (
                                    <input
                                        key={oIndex}
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit">Update Quiz</button>
            </form>
        </div>
    );
};

export default EditQuiz;

