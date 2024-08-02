// src/redux/actions/quizActions.js
// import axios from 'axios';

// export const getQuizzes = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/quizzes');
//         dispatch({
//             type: 'GET_QUIZZES',
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: 'QUIZ_ERROR',
//         });
//     }
// };

// export const addQuiz = (quizData) => async dispatch => {
//     try {
//         const res = await axios.post('/api/quizzes', quizData);
//         dispatch({
//             type: 'ADD_QUIZ',
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: 'QUIZ_ERROR',
//         });
//     }
// };

// export const updateQuiz = (id, quizData) => async dispatch => {
//     try {
//         const res = await axios.put(`/api/quizzes/${id}`, quizData);
//         dispatch({
//             type: 'UPDATE_QUIZ',
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: 'QUIZ_ERROR',
//         });
//     }
// };

// export const deleteQuiz = (id) => async dispatch => {
//     try {
//         await axios.delete(`/api/quizzes/${id}`);
//         dispatch({
//             type: 'DELETE_QUIZ',
//             payload: id,
//         });
//     } catch (err) {
//         dispatch({
//             type: 'QUIZ_ERROR',
//         });
//     }
// };


// src/redux/actions/quizActions.js
import axios from 'axios';
import { GET_QUIZZES, ADD_QUIZ, DELETE_QUIZ, EDIT_QUIZ } from '../../Redux/actions/types';

// Get Quizzes
export const getQuizzes = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3000/api/quizzes');
        dispatch({
            type: 'GET_QUIZZES',
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: 'QUIZ_ERROR',
            payload: err.response.data,
        });
    }
};

// Add Quiz
export const addQuiz = (quizData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/quizzes', quizData);
        dispatch({ type: ADD_QUIZ, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

// Delete Quiz
export const deleteQuiz = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/quizzes/${id}`);
        dispatch({ type: DELETE_QUIZ, payload: id });
    } catch (err) {
        console.error(err);
    }
};

// Edit Quiz
export const editQuiz = (id, quizData) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/quizzes/${id}`, quizData);
        dispatch({ type: EDIT_QUIZ, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

