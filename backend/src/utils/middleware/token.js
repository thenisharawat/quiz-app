const jwt = require('jsonwebtoken');
const { HttpStatus } = require('../common/enums/httpStatusCodes');
const { response } = require('./response');
const { messages } = require('../common/functions/message');

// Secret key for signing tokens
const secretKey = process.env.JWT_SECRET || 'secret-key';

// Middleware to verify JWT token
exports.auth = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return response(res, HttpStatus.unauthorized, false, messages.noTokenProvided(), null);
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) {
            // Remove sensitive fields from decoded token
            delete decoded.iat;
            delete decoded.exp;
            delete decoded.__v;

            req.user = decoded;
            next();
        }
    } catch (error) {
        console.error("Catch Error:-", error);
        return response(res, HttpStatus.forbidden, false, error.message, error);
    }
};

// Generate JWT token for users
exports.genToken = async (params) => {
    const token = jwt.sign(params, secretKey, { expiresIn: '30d' });
    return token;
};

// Generate JWT token for admin
exports.genAdminToken = async (params) => {
    const token = jwt.sign(params, secretKey, { expiresIn: '24h' });
    return token;
};
