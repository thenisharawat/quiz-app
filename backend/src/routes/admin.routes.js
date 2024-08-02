const { Router } = require('express');
const { adminLoginController } = require('../controllers/admin.controller');
const validation = require('../utils/middleware/validationHandler');
const { validator, validationError } = validation;
const adminRouter = Router();

// Admin login route
adminRouter.post('/login',
    validator.email,
    validator.adminPassword,
    validationError,
    adminLoginController
);

module.exports = adminRouter;
