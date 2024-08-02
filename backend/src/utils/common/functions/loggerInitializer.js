const pino = require("pino");
const path = require("path");
const fs = require("fs");

// Directory where log files will be stored
const logDir = path.join(__dirname, '../../../../logs');

// Function to create the log directory and controller-specific subdirectories if they don't exist
const ensureLogDirectory = (controllerName) => {
    const controllerLogDirectory = path.join(logDir, controllerName);
    // If the directory does not exist, it will create the new directory along with parent directories using { recursive: true }
    if (!fs.existsSync(controllerLogDirectory)) {
        fs.mkdirSync(controllerLogDirectory, { recursive: true });
    }
};

// Create a function to initialize the logger with a dynamic log level
const createLogger = (controllerName, logLevel = 'info') => {
    // Ensure that the necessary directories exist before creating the logger
    ensureLogDirectory(controllerName);

    const logFilePath = path.join(logDir, controllerName, `${logLevel}.log`);

    return pino({ level: logLevel, timestamp: true }, pino.destination({ dest: logFilePath, sync: false }));
};

module.exports = createLogger;