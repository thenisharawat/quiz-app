const { validationResult } = require('express-validator');

const { HttpStatus } = require('../utils/common/enums/httpStatusCodes');
const { response } = require('../utils/middleware/response');
const { messages } = require('../utils/common/functions/message');
const { printLogger } = require('../utils/common/functions/logger');
const { LoggerType } = require('../utils/common/enums/loggerTypes');
const { comparePassword, hashPassword } = require('../utils/common/functions/passwordHashing');
const userModel = require('../models/user.model');
const { Status } = require('../utils/common/enums/status');
const { Roles } = require('../utils/common/enums/roles');
const { genToken } = require('../utils/middleware/token');

// Register user controller
exports.registerUserController = async (req, res, next) => {
    try {
        let body = req.body;
        const userExists = await userModel.getUserByEmail(body.email);

        if (userExists) {
            return response(res, HttpStatus.badRequest, false, messages.alreadyExists(`email: ${body.email}`), null);
        }

        body.password = await hashPassword(body.password);
        body.status = Status.inactiveStatus;
        body.role = Roles.userRoleId;

        let saveResult = await userModel.createUser(body);
        if (!saveResult) {
            return response(res, HttpStatus.internalServerError, false, messages.userNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.userSaved(), saveResult);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "registerUserController", "user.controller.js");
    }
};

// User login controller
exports.userLoginController = async (req, res, next) => {
    try {
        let body = req.body;
        let userEmail = body.email.trim();
        let userPassword = body.password.trim();
        const userResult = await userModel.getUserByEmail(userEmail);

        if (userResult) {
            const { password, ...restProps } = userResult;
            // Check if the user is blocked or deleted
            if (restProps.status === Status.deletedStatus || restProps.status === Status.blockedStatus) {
                return response(res, HttpStatus.forbidden, false, messages.blockedOrDeletedMessage(), null);
            }

            if (password) {
                let passwordMatched = await comparePassword(userPassword, password);
                if (passwordMatched) {
                    // Check if the user is logging in for the first time then mark the status as active
                    if (restProps.status === Status.inactiveStatus) {
                        let updateResult = await userModel.updateUserById(restProps._id, { status: Status.activeStatus });
                        if (updateResult) {
                            restProps.status = Status.activeStatus;
                        }
                    }
                    const jwt = await genToken(restProps);
                    let responseData = {
                        token: jwt,
                        ...restProps,
                    };
                    return response(res, HttpStatus.ok, true, messages.loginSuccess(), responseData);
                }
                return response(res, HttpStatus.unauthorized, false, messages.incorrectPassword(), null);
            }
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "userLoginController", "user.controller.js");
        next(error);
    }
};

// Update user controller
exports.updateUserController = async (req, res, next) => {
    try {
        let body = req.body;
        // Destruct the body object so user can't modify crucial fields
        const { userId, role, status, email, mobile_number, ...restBodyProps } = body;

        let user_id = req.user?.role === Roles.adminRoleId ? +(userId || "") : req.user?._id;

        restBodyProps.password = await hashPassword(restBodyProps.password);

        const updateResult = await userModel.updateUserById(user_id, restBodyProps);

        if (!updateResult) {
            return response(res, HttpStatus.internalServerError, false, messages.updatedFailed(), null);
        }
        return response(res, HttpStatus.ok, true, messages.updatedSuccess(), updateResult);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateUserController", "user.controller.js");
    }
};

// Delete user controller
exports.deleteUserController = async (req, res, next) => {
    try {
        let userResult = await userModel.getUserById(req.body?.user_id);

        if (!userResult) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        // Soft delete user by updating the status as deleted
        let updateStatus = { status: Status.deletedStatus };

        const updateResult = await userModel.updateUserById(user_id, updateStatus);

        if (!updateResult) {
            return response(res, HttpStatus.internalServerError, false, messages.deletedFailed(), null);
        }
        return response(res, HttpStatus.ok, true, messages.deletedSuccess(), updateResult);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "deleteUserController", "user.controller.js");
    }
};

// Get user data
exports.getUserController = async (req, res, next) => {
    try {
        let user_id = req.user?.role === Roles.adminRoleId ? req.query?._id : req.user?._id;

        let userResult = await userModel.getUserById((user_id + ""));

        if (!userResult) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        const { password, ...restUserProps } = userResult;
        return response(res, HttpStatus.ok, true, messages.dataFound(), restUserProps);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getUserController", "user.controller.js");
    }
};

// Get all users data
exports.getAllUsersController = async (req, res, next) => {
    try {
        let userResult = await userModel.getAllUsers();

        if (userResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let responseData = {
            count: userResult.length,
            users: userResult
        };
        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    } catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllUsersController", "user.controller.js");
    }
};
