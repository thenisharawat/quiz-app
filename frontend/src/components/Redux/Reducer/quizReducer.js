// src/redux/reducers/quizReducer.js
const initialState = {
    quizzes: [],
    quiz: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_QUIZZES':
            return {
                ...state,
                quizzes: action.payload,
                loading: false,
            };
        case 'ADD_QUIZ':
            return {
                ...state,
                quizzes: [...state.quizzes, action.payload],
                loading: false,
            };
        case 'UPDATE_QUIZ':
            return {
                ...state,
                quizzes: state.quizzes.map(quiz =>
                    quiz._id === action.payload._id ? action.payload : quiz
                ),
                loading: false,
            };
        case 'DELETE_QUIZ':
            return {
                ...state,
                quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload),
                loading: false,
            };
        case 'QUIZ_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
