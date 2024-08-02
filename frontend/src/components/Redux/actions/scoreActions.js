// src/Redux/actions/scoreActions.js

export const getScores = () => async dispatch => {
    dispatch({ type: 'GET_SCORES_REQUEST' });

    try {
        const response = await fetch('/api/scores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: 'GET_SCORES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'GET_SCORES_FAILURE', payload: error.message });
    }
};
