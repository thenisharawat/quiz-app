const { HttpStatus } = require('../common/enums/httpStatusCodes');
const { messages } = require('../common/functions/message');
const { response } = require('./response');

// Role based permission for routes to prevent unauthorized access
exports.permit = (roles) => {
    return (req, res, next) => {
        const roleId = req?.user?.role;

        if (!roles.includes(roleId)) {
            return response(res, HttpStatus.unauthorized, false, messages.notAuthorized(), null);
        }
        next();
    };
};
