const quizModel = require('../models/quiz.model');
const { HttpStatus } = require('../utils/common/enums/httpStatusCodes');
const { response } = require('../utils/middleware/response');
const { validationResult } = require('express-validator');
const { printLogger } = require('../utils/common/functions/logger');
const { LoggerType } = require('../utils/common/enums/loggerTypes');
const { messages } = require('../utils/common/functions/message'); // Importing messages

// Create Quiz Controller
exports.createQuizController = async (req, res, next) => {
    try {
        const quizData = req.body;
        const newQuiz = await quizModel.createQuiz(quizData);

        if (!newQuiz) {
            return response(res, HttpStatus.internalServerError, false, messages.quizNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.quizSaved(), newQuiz);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "createQuizController", "quiz.controller.js");
        next(error);
    }
};

// Update Quiz Controller
exports.updateQuizController = async (req, res, next) => {
    try {
        const { _id, ...quizData } = req.body;
        const updatedQuiz = await quizModel.updateQuizById(_id, quizData);

        if (!updatedQuiz) {
            return response(res, HttpStatus.notFound, false, messages.quizNotFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.quizUpdated(), updatedQuiz);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateQuizController", "quiz.controller.js");
        next(error);
    }
};

// Delete Quiz Controller
exports.deleteQuizController = async (req, res, next) => {
    try {
        const quizId = req.query.id;
        const deletedQuiz = await quizModel.updateQuizById(quizId);

        if (!deletedQuiz) {
            return response(res, HttpStatus.notFound, false, messages.quizNotFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.quizDeleted(), deletedQuiz);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "deleteQuizController", "quiz.controller.js");
        next(error);
    }
};

// Get Quiz by ID Controller
exports.getQuizController = async (req, res, next) => {
    try {
        const quizId = req.query.id;
        const quiz = await quizModel.getQuizById(quizId);

        if (!quiz) {
            return response(res, HttpStatus.notFound, false, messages.quizNotFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), quiz);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getQuizController", "quiz.controller.js");
        next(error);
    }
};

// Get All Quizzes Controller
exports.getAllQuizzesController = async (req, res, next) => {
    try {
        const quizzes = await quizModel.getAllQuizzes();

        if (quizzes.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), { total_quizzes: 0 });
        }

        let resp = { total_quizzes: quizzes.length, quizzes: quizzes }
        return response(res, HttpStatus.ok, true, messages.dataFound(), resp);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllQuizzesController", "quiz.controller.js");
        next(error);
    }
};

/* For Users */

// // Get All Available Quizzes Controller
// exports.getAllAvailableQuizzesController = async (req, res, next) => {
//     try {
//         const quizzes = await quizModel.getAllQuizzes();

//         if (quizzes.length === 0) {
//             return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
//         }
//         return response(res, HttpStatus.ok, true, messages.dataFound(), quizzes);
//     } catch (error) {
//         console.error("Catch error:-", error);
//         printLogger(LoggerType.error, error.message, "getAllAvailableQuizzesController", "quiz.controller.js");
//         next(error);
//     }
// };

// Attempt Quiz Controller
exports.attemptQuizController = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const quizId = req.query.quiz_id;
        const answers = req.body.answers;

        const userAttempt = await quizModel.getUserAttempt(userId, quizId);

        if (userAttempt) {
            return response(res, HttpStatus.forbidden, false, messages.quizAlreadyAttempted(), null);
        }

        const result = await quizModel.recordQuizAttempt(userId, quizId, answers);
        return response(res, HttpStatus.ok, true, messages.quizAttempted(), result);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "attemptQuizController", "quiz.controller.js");
        next(error);
    }
};

// View Quiz Score Controller
exports.viewQuizScoreController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const quizId = req.query.quiz_id;

        const score = await quizModel.getUserQuizScore(userId, quizId);
        if (!score) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), { total_quizzes: score?.answers.length, score: score?.score});
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "viewQuizScoreController", "quiz.controller.js");
        next(error);
    }
};

// View All Attempted Quizzes and Scores Controller
exports.viewAllAttemptsController = async (req, res, next) => {
    try {
        const attempts = await quizModel.getAllUserAttempts();
        if (attempts.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), { total_attempts: 0 });
        }
        let resp = { total_attempts: attempts.length, attempts: attempts }
        return response(res, HttpStatus.ok, true, messages.dataFound(), resp);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "viewAllAttemptsController", "quiz.controller.js");
        next(error);
    }
};

// View Dashboard Data Controller
exports.viewDashboardDataController = async (req, res, next) => {
    try {
        const userId = req.user?._id;

        const dashboardData = await quizModel.getDashboardData(userId);
        if (!dashboardData) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), dashboardData);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "viewDashboardDataController", "quiz.controller.js");
        next(error);
    }
};