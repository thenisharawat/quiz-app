exports.messages = {

    // User-related messages
    userNotSaved: () => {
        return "User could not be created!";
    },

    userSaved: () => {
        return "User account is created successfully!";
    },

    updatedSuccess: () => {
        return `Data updated successfully!`;
    },

    updatedFailed: () => {
        return `Data couldn't be updated!`;
    },

    deletedSuccess: () => {
        return `Deleted successfully!`;
    },

    deletedFailed: () => {
        return `Sorry, couldn't be deleted!`;
    },

    savedSuccess: () => {
        return `Data saved successfully!`;
    },

    savedFailed: () => {
        return `Data couldn't be saved!`;
    },

    noDataFound: () => {
        return `Sorry, no data found!`;
    },

    dataFound: () => {
        return `Data found!`;
    },

    loginSuccess: () => {
        return `Logged in successfully!`;
    },

    incorrectPassword: () => {
        return `Incorrect password, please enter a correct password!`;
    },

    errorMessage: () => {
        return `Oops! something went wrong, please try again.`;
    },

    blockedOrDeletedMessage: () => {
        return `Oops! looks like this account is blocked or deleted, please contact the site admin.`;
    },

    alreadyExists: (params) => {
        return `Sorry, this ${params} is already linked with another account.`;
    },

    oldPasswordExists: () => {
        return `Sorry, this password is already exists, please choose another password.`;
    },

    validationError: () => {
        return `Please check validation fields!`;
    },

    notFileUploadedError: () => {
        return `No file uploaded!`;
    },

    // Quiz-related messages
    quizNotSaved: () => {
        return "Quiz could not be saved!";
    },

    quizSaved: () => {
        return "Quiz saved successfully!";
    },

    quizNotUpdated: () => {
        return "Quiz could not be updated!";
    },

    quizUpdated: () => {
        return "Quiz updated successfully!";
    },

    quizNotDeleted: () => {
        return "Quiz could not be deleted!";
    },

    quizDeleted: () => {
        return "Quiz deleted successfully!";
    },

    quizNotFound: () => {
        return "Quiz not found!";
    },

    questionNotSaved: () => {
        return "Question could not be saved!";
    },

    questionSaved: () => {
        return "Question saved successfully!";
    },

    questionNotUpdated: () => {
        return "Question could not be updated!";
    },

    questionUpdated: () => {
        return "Question updated successfully!";
    },

    questionNotDeleted: () => {
        return "Question could not be deleted!";
    },

    questionDeleted: () => {
        return "Question deleted successfully!";
    },

    questionsNotFound: () => {
        return "Questions not found!";
    },

    scoresFetched: () => {
        return "Scores fetched successfully!";
    },

    scoresNotFound: () => {
        return "No scores found for the specified quiz!";
    },

    quizAttempted: () => {
        return "Quiz attempted successfully!";
    },

    quizAlreadyAttempted: () => {
        return "Quiz already attempted!";
    },

    quizAttemptFailed: () => {
        return "Failed to attempt quiz, please try again.";
    },

    invalidQuiz: () => {
        return "Invalid quiz or quiz not available!";
    },

    noTokenProvided: () => {
        return "Authorization failed, no token provided!";
    },

    invalidOrExpiredToken: () => {
        return "Authorization failed, token is invalid!";
    },
}
