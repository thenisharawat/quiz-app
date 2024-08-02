const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String, required: true
    },
    options: [{
        type: String, required: true
    }],
    answer: {
        type: String, required: true
    }
});

const allQuizSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    },
    timer: {
        type: Number, required: true
    }, // Timer in seconds
    questions: [questionSchema]
}, { timestamps: true });


// User Quiz Attempt Schema
const userQuizAttemptSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: 'quizzes',
        required: true
    },
    answers: [
        {
            questionId: {
                type: Schema.Types.ObjectId,
                ref: 'quizzes'
            },
            selectedOption: String
        }
    ],
    score: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const quizSchema = mongoose.model('quizzes', allQuizSchema);
const userQuizAttempt = mongoose.model('userquizattempts', userQuizAttemptSchema);

module.exports = { quizSchema, userQuizAttempt };