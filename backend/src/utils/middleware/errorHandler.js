import { HttpStatus } from "../common/enums/httpStatusCodes";
import { response } from "./response";

exports.errorHandler = async (error, res) => {
    const statusCode = error.statusCode || HttpStatus.internalServerError;
    const message = error.message || "Something went wrong!";
    const data = error.data || null;

    response(res, statusCode, false, message, data);
};