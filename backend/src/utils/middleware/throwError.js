exports.ErrData = (statusCode, message, data) => {
    let error = new Error(message);
    error.statusCode = statusCode;
    error.data = data;
    throw error;
};
