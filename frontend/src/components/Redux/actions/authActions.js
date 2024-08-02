// src/redux/actions/authActions.js
import axios from 'axios';

export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth/user');
        dispatch({
            type: 'USER_LOADED',
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR',
        });
    }
};

export const login = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/auth', formData);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: 'LOGIN_FAIL',
        });
    }
};
