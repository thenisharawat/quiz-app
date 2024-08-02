exports.response = async (res, statusCode, isStatus, message, result) => {
    return res.status(statusCode).json({
        success: isStatus,
        message: message,
        data: result
    });
};