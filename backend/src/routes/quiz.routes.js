const { Router } = require('express');
const quizRouter = Router();

const { permit } = require('../utils/middleware/permissionHandler');
const { validator, validationError } = require('../utils/middleware/validationHandler');
const { Roles } = require('../utils/common/enums/roles');
const { auth } = require('../utils/middleware/token');

const { createQuizController, updateQuizController, deleteQuizController, getQuizController, getAllQuizzesController, getAllAvailableQuizzesController, attemptQuizController, viewQuizScoreController, viewAllAttemptsController, viewDashboardDataController } = require('../controllers/quiz.controller');

// Create a new quiz
quizRouter.post('/create',
    auth,
    permit([Roles.adminRoleId]), // Only admin can create quizzes
    validator.quizTitle,
    validator.quizTimer,
    validator.quizQuestions,
    validationError,
    createQuizController
);

// Update a quiz
quizRouter.post('/update',
    auth,
    permit([Roles.adminRoleId]), // Only admin can update quizzes
    validator._id,
    validationError,
    updateQuizController
);

// Delete a quiz
quizRouter.delete('/delete',
    auth,
    permit([Roles.adminRoleId]), // Only admin can delete quizzes
    validator._id,
    validationError,
    deleteQuizController
);

// Get quiz by ID
quizRouter.get('/get',
    auth,
    permit([Roles.adminRoleId, Roles.userRoleId]), // Admins and users can get quiz details
    validator._id,
    validationError,
    getQuizController
);

// Get all quizzes
quizRouter.get('/get-all', getAllQuizzesController);

/* For Users */

// Attempt Quiz
quizRouter.post('/quiz-attempt',
    auth,
    permit([Roles.userRoleId]), // Only user can perform this task
    validator.answers,
    validationError,
    attemptQuizController);

// View Quiz Score by quiz id
quizRouter.get('/quiz-score',
    auth,
    permit([Roles.userRoleId]), // Only user can perform this task
    validator.quiz_id,
    validationError,
    viewQuizScoreController);

// View All Attempted Quizzes and Scores
quizRouter.get('/all-user-attempts',
    auth,
    permit([Roles.adminRoleId]), // Only admin can View All Attempted Quizzes and Scores
    viewAllAttemptsController);

// View Dashboard Data
quizRouter.get('/user-dashboard',
    auth,
    permit([Roles.userRoleId]), // User can get dashboard
    viewDashboardDataController);

module.exports = quizRouter;
