// Quiz status
exports.QuizStatus = Object.freeze({ // To make these constant used freeze
    quizInitiated: 0,
    quizPending: 1,
    quizApproved: 2,
    quizProcessing: 3,
    quizDelivered: 4,
    quizCancelled: 5,
    quizReturned: 6,
});