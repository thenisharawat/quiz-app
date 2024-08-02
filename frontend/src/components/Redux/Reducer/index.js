
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    score: scoreReducer,
});

export default rootReducer;
