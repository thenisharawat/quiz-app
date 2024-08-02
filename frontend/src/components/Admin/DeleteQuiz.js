import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById, deleteQuiz } from '../Redux/actions/quizActions';

const DeleteQuiz = ({ match, history }) => {
    const dispatch = useDispatch();
    const { quiz } = useSelector(state => state.quiz);

    useEffect(() => {
        dispatch(getQuizById(match.params.id));
    }, [dispatch, match.params.id]);

    const handleDelete = () => {
        dispatch(deleteQuiz(match.params.id, history));
    };

    return (
        <div>
            {quiz && (
                <div>
                    <h1>Are you sure you want to delete this quiz?</h1>
                    <h2>{quiz.title}</h2>
                    <p>{quiz.description}</p>
                    <button onClick={handleDelete}>Yes, Delete</button>
                    <button onClick={() => history.goBack()}>No, Cancel</button>
                </div>
            )}
        </div>
    );
};

export default DeleteQuiz;
