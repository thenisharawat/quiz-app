const pino = require("pino");
const createLogger = require("./loggerInitializer");
const { LoggerType } = require("../enums/loggerTypes");

const printLogger = async (loggerType, message, moduleName, controllerName) => {
    const logger = createLogger(controllerName, loggerType);
    switch (loggerType) {
        case LoggerType.error:
            logger.error({ module: moduleName }, message);
            break;
        case LoggerType.debug:
            logger.debug({ module: moduleName }, message);
            break;
        case LoggerType.info:
            logger.info({ module: moduleName }, message);
            break;
        case LoggerType.warn:
            logger.warn({ module: moduleName }, message);
            break;
        default:
            logger.info({ module: moduleName }, message);
            break;
    }
};

module.exports = { printLogger };