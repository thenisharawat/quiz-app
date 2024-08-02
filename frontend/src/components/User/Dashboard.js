
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const UserDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">User Dashboard</h2>
            <ul className="dashboard-menu">
                <li className="dashboard-menu-item">
                    <Link to="/user/attempt-quiz" className="dashboard-link">Attempt Quiz</Link>
                </li>
                <li className="dashboard-menu-item">
                    <Link to="/user/view-scores" className="dashboard-link">View Scores</Link>
                </li>
            </ul>
        </div>
    );
};

export default UserDashboard;
