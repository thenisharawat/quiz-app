// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getQuizzes, deleteQuiz } from '../../redux/actions/quizActions';

// const ViewQuizzes = () => {
//     const dispatch = useDispatch();
//     const { quizzes } = useSelector(state => state.quiz);

//     useEffect(() => {
//         dispatch(getQuizzes());
//     }, [dispatch]);

//     const handleDelete = (id) => {
//         dispatch(deleteQuiz(id));
//     };

//     return (
//         <div>
//             <h1>View Quizzes</h1>
//             <ul>
//                 {quizzes.map(quiz => (
//                     <li key={quiz._id}>
//                         <h2>{quiz.title}</h2>
//                         <button onClick={() => handleDelete(quiz._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ViewQuizzes;

// import { getQuizzes } from '../Redux/actions/quizActions';

// src/components/Admin/ViewQuizzes.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes } from '../Redux/actions/quizActions';

const ViewQuizzes = () => {
    const dispatch = useDispatch();
    const quizzes = useSelector(state => state.quizzes.quizzes); // Ensure this matches the state structure

    useEffect(() => {
        dispatch(getQuizzes());
    }, [dispatch]);

    if (!quizzes) return <div>Loading...</div>;

    return (
        <div>
            {quizzes.length > 0 ? (
                quizzes.map(quiz => (
                    <div key={quiz._id}>{quiz.title}</div>
                ))
            ) : (
                <div>No quizzes available</div>
            )}
        </div>
    );
};

export default ViewQuizzes;