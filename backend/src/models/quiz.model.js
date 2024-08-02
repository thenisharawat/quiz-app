// const { Types } = require("mongoose");
const { ObjectId } = require('bson');
const allQuizSchema = require("../schemas/quiz.schema");
const { userQuizAttempt, quizSchema } = allQuizSchema;
const quizModel = {
    // Create a new quiz
    createQuiz: async (quizData) => {
        const quiz = new quizSchema(quizData);
        return await quiz.save();
    },

    // Get a quiz by its title
    getQuizByTitle: async (title) => {
        let result = await quizSchema.findOne({ title: title }).lean();
        return result;
    },

    // Get a quiz by its ID
    getQuizById: async (id) => {
        let quizResult = await quizSchema.findOne({ _id: id }).lean();
        return quizResult;
    },

    // Get all quizzes
    getAllQuizzes: async () => {
        let quizzesResult = await quizSchema.find().lean();
        return quizzesResult;
    },

    // Update a quiz by its ID
    updateQuizById: async (id, quizData) => {
        let result = await quizSchema.findOneAndUpdate({ _id: id }, {
            $set: quizData
        }, { new: true });
        return result;
    },

    // Delete a quiz by its ID
    deleteQuizById: async (id) => {
        let result = await quizSchema.findOneAndDelete({ _id: id });
        return result;
    },

    getUserAttempt: async (userId, quizId) => {
        return await userQuizAttempt.findOne({ userId, quizId });
    },

    // Calculate the score and record the quiz attempt
    recordQuizAttempt: async (userId, quizId, answers) => {
        // Fetch quiz with questions and correct answers
        const quiz = await quizSchema.findOne({ _id: quizId }).lean();
        if (!quiz) {
            console.log("Quiz not found");
            return null;
        }
        // Create a map for correct answers
        const correctAnswers = quiz.questions.reduce((acc, question) => {
            acc[question._id.toString()] = question.answer;
            return acc;
        }, {});

        // Calculate the score
        let score = 0, correctAnswerArr = [], incorrectAnswerArr = [];
        answers.forEach(answer => {
            const correctAnswer = correctAnswers[answer.questionId.toString()];
            if (correctAnswer && correctAnswer === answer.selectedOption) {
                correctAnswerArr.push(
                    { questionId: answer.questionId, your_answer: correctAnswer }
                );
                score += 1; // Increment score for each correct answer
            }
            else {
                incorrectAnswerArr.push(
                    { questionId: answer.questionId, your_answer: answer.selectedOption }
                );
            }
        });

        let correct = correctAnswerArr, incorrect = incorrectAnswerArr;
        let saveData = { userId, quizId, correct, incorrect, answers, score };

        // Record the attempt
        const attempt = new userQuizAttempt(saveData);

        let saveResult = await attempt.save();
        if (saveResult) {
            return saveData;
        }
        return saveResult;
    },

    getUserQuizScore: async (userId, quizId) => {
        return await userQuizAttempt.findOne({ userId, quizId }).select('score').select('answers');
    },

    getAllUserAttempts: async () => {
        return await userQuizAttempt.find();
    },

    getDashboardData: async (userId) => {
        let pipeline = [
            {
                '$match': { user_id: new ObjectId(userId) }
            },
            {
                '$lookup': {
                    'from': 'quizzes',
                    'localField': 'quiz_id',
                    'foreignField': '_id',
                    'as': 'quizDetails'
                }
            }, {
                '$unwind': {
                    'path': '$quizDetails',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'userDetails'
                }
            }, {
                '$unwind': {
                    'path': '$userDetails',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    '_id': 1,
                    'quiz_id': 1,
                    'answers': 1,
                    'quizDetails.title': 1,
                    'quizDetails.description': 1,
                    'quizDetails.timer': 1,
                    'userDetails.name': 1,
                    'userDetails.email': 1,
                    'createdAt': 1
                }
            }
        ];
        const dashboardData = await userQuizAttempt.aggregate(pipeline);

        return {
            attempts: dashboardData,
            total_attempts: dashboardData.length
        };
    }
}

module.exports = quizModel;
