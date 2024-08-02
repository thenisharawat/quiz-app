import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Importing a separate CSS file for styling

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>
            <div className="dashboard-links">
                <Link to="/admin/add-quiz" className="dashboard-link">
                    <div className="dashboard-card">
                        <h3>Add Quiz</h3>
                        <p>Create a new quiz and add questions.</p>
                    </div>
                </Link>
                <Link to="/admin/view-quizzes" className="dashboard-link">
                    <div className="dashboard-card">
                        <h3>View Quizzes</h3>
                        <p>Manage and view existing quizzes.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
