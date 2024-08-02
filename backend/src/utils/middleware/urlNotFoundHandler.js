const { HttpStatus } = require("../common/enums/httpStatusCodes");
const { response } = require("./response");

// URL handler middleware for unidentified routes
exports.urlNotFound = (req, res, next) => {
    response(res, HttpStatus.notFound, false, "URL not found!", null);
};