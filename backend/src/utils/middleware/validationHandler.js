const { body, check, validationResult } = require('express-validator');
const { response } = require("../middleware/response");
const { HttpStatus } = require('../common/enums/httpStatusCodes');
const { messages } = require('../common/functions/message');

const validator = {
    _id: check('_id').notEmpty().withMessage("_id is required!").isString().withMessage('ID must be a string!'),
    user_id: check('user_id').notEmpty().withMessage("user_id is required!").isString().withMessage('ID must be a string!'),
    email: body('email').notEmpty().withMessage('Email address is required!').isEmail().withMessage('Email address is invalid!'),
    mobileNumber: body('mobile_number').notEmpty().withMessage('Mobile number is required!')
        .matches(/^[6789]/).withMessage('Mobile number must start with 6, 7, 8, or 9.')
        .isMobilePhone('any', { strictMode: false }).withMessage('Mobile number is invalid!'),
    password: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    adminPassword: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    name: body('name').notEmpty().withMessage('Name is required!').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long!'),
    role: body('role').notEmpty().withMessage('Role is required!').isIn([1, 2]),

    quizTitle: body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
    quizTimer: body('timer').isNumeric().withMessage('Timer must be a number').notEmpty().withMessage('Timer is required'),
    quizQuestions: body('questions').isArray().withMessage('Questions must be an array').notEmpty().withMessage('Questions are required'),

    questionFields: body('questions.*.question').isString().withMessage('Question must be a string'),
    optionsFields: body('questions.*.options').isArray().withMessage('Options must be an array'),
    answerField: body('questions.*.answer').isString().withMessage('Answer must be a string'),
    quiz_id: check('quiz_id').notEmpty().withMessage("quiz_id is required!").isString().withMessage('ID must be a string!'),

    answers: body('answers').isArray().withMessage('Answer must be an array').notEmpty().withMessage('Answers array cannot be empty')
        .custom((answers) => {
            return answers.every(answer =>
                typeof answer.questionId === 'string' && answer.questionId.trim() !== '' &&
                typeof answer.selectedOption === 'string' && answer.selectedOption.trim() !== ''
            ) || 'Each answer must contain valid questionId and selectedOption as non-empty strings';
        }),
}

const validationError = (req, res, next) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
    }
    next();
}

module.exports = {
    validator,
    validationError
};