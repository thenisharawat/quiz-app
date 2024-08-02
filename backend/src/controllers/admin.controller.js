const { response } = require("../utils/middleware/response");
const { HttpStatus } = require("../utils/common/enums/httpStatusCodes");
const { messages } = require("../utils/common/functions/message");
const adminModel = require("../models/admin.model");
const { comparePassword, hashPassword } = require("../utils/common/functions/passwordHashing");
const { genAdminToken } = require("../utils/middleware/token");
const { printLogger } = require("../utils/common/functions/logger");
const { LoggerType } = require("../utils/common/enums/loggerTypes");
const { Roles } = require("../utils/common/enums/roles");
const { Status } = require("../utils/common/enums/status");

// Auto admin create controller
exports.autoAdminCreateController = async () => {
    try {
        const { ADMIN_NAME, ADMIN_NAME2, ADMIN_EMAIL, ADMIN_EMAIL2, ADMIN_PASSWORD, ADMIN_PASSWORD2, ADMIN_MOBILE, ADMIN_MOBILE2 } = process.env;

        let adminDataArray = [
            {
                name: (ADMIN_NAME + ""),
                email: (ADMIN_EMAIL || ""),
                mobile_number: parseInt((ADMIN_MOBILE || ""), 10),
                password: await hashPassword((ADMIN_PASSWORD + "")),
                role: Roles.adminRoleId,
                status: Status.activeStatus,
                created_at: new Date()
            },
            {
                name: (ADMIN_NAME2 + ""),
                email: (ADMIN_EMAIL2 || ""),
                mobile_number: parseInt((ADMIN_MOBILE2 || ""), 10),
                password: await hashPassword((ADMIN_PASSWORD2 + "")),
                role: Roles.adminRoleId,
                status: Status.activeStatus,
                created_at: new Date()
            }
        ];

        adminDataArray.forEach(async (result) => {
            let adminResult = await adminModel.getAdmin(result.email);

            if (!adminResult) {
                let saveAdminResult = await adminModel.saveAdmin(result);
                if (saveAdminResult) {
                    console.log(`Admin ${saveAdminResult} created successfully!`);
                }
                else {
                    console.log("Admin creation failed, something went wrong: ", saveAdminResult);
                }
            }
            else {
                console.log(`Admin is already created!`);
            }
        });
    }
    catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "autoCreateAdminController", "admin.controller.ts");
    }
}

// Admin login controller
exports.adminLoginController = async (req, res, next) => {
    try {
        let Body = req.body;

        let adminEmail = Body?.email.trim();
        let adminPassword = (Body?.password + "").trim();
        const adminResult = await adminModel.getAdmin(adminEmail);
        if (adminResult) {
            const { password, ...restProps } = adminResult;
            if (password) {
                let passwordMatched = await comparePassword(adminPassword, password);
                if (passwordMatched) {
                    const jwt = await genAdminToken(restProps);
                    return response(res, HttpStatus.ok, true, messages.loginSuccess(), jwt);
                }
                return response(res, HttpStatus.notFound, false, messages.incorrectPassword(), null);
            }
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
    }
    catch (error) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "adminLoginController", "admin.controller.ts");
        next(error);
    }
};