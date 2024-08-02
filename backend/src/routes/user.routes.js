const { Router } = require('express');
const { validator, validationError } = require('../utils/middleware/validationHandler');
const { Roles } = require('../utils/common/enums/roles');
const { permit } = require('../utils/middleware/permissionHandler');
const { auth } = require('../utils/middleware/token');
const {
    deleteUserController,
    getAllUsersController,
    getUserController,
    registerUserController,
    userLoginController,
    updateUserController
} = require('../controllers/user.controller');

const userRouter = Router();

// Register user data
userRouter.post('/register',
    validator.name,
    validator.email,
    validator.mobileNumber,
    validator.password,
    validationError,
    registerUserController
);

// User login
userRouter.post('/login',
    validator.email,
    validator.password,
    validationError,
    userLoginController
);

// Update user data
userRouter.post('/update-user',
    auth,
    permit([Roles.userRoleId, Roles.adminRoleId]), // User and admin both can perform this task
    updateUserController
);

// Delete user
userRouter.post('/delete-user',
    auth,
    permit([Roles.adminRoleId]), // Admin can perform this task
    deleteUserController
);

// Get user by ID
userRouter.get('/get-user',
    auth,
    permit([Roles.adminRoleId, Roles.userRoleId]), // User and admin both can perform this task
    validator._id,
    validationError,
    getUserController
);

// Get all users
userRouter.get('/get-all-users',
    auth,
    permit([Roles.adminRoleId]), // Admin can perform this task
    getAllUsersController
);

module.exports = userRouter;
