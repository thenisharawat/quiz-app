
const initialState = {
    data: [],   // Ensure data is initialized as an empty array
    loading: false,
    error: null
};

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SCORES_REQUEST':
            return { ...state, loading: true };
        case 'GET_SCORES_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'GET_SCORES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default scoreReducer;
