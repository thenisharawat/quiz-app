// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserScores } from '../../redux/actions/scoreActions';

// const ViewScores = () => {
//     const dispatch = useDispatch();
//     const { scores } = useSelector(state => state.score);

//     useEffect(() => {
//         dispatch(getUserScores());
//     }, [dispatch]);

//     return (
//         <div>
//             <h1>View Scores</h1>
//             <ul>
//                 {scores.map(score => (
//                     <li key={score._id}>
//                         <h2>{score.quizTitle}</h2>
//                         <p>Score: {score.score}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ViewScores;


// src/components/User/ViewScores.js
// src/components/User/ViewScores.js

// src/components/User/ViewScores.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScores } from '../Redux/actions/scoreActions';
import './ViewScores.css'; // Import your CSS file for styling

const ViewScores = () => {
    const dispatch = useDispatch();

    const scores = useSelector(state => state.scores?.data);
    const loading = useSelector(state => state.scores?.loading);
    const error = useSelector(state => state.scores?.error);

    useEffect(() => {
        dispatch(getScores());
    }, [dispatch]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="view-scores-container">
            <h2>View Scores</h2>
            {scores && scores.length > 0 ? (
                <table className="scores-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Quiz</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(score => (
                            <tr key={score.id}>
                                <td>{score.student}</td>
                                <td>{score.quiz}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-scores">No scores available</div>
            )}
        </div>
    );
};

export default ViewScores;
