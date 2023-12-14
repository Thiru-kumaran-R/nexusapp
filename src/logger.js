// logger.js
import {createLogger, format, transports} from 'winston';

// Destructure the format module for ease of use
const { combine, timestamp, printf, colorize, json } = format;

// Define your custom format with printf
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const level = process.env.LOG_LEVEL || 'debug';

// Create the logger instance
const logger = createLogger({
    level: level, // Minimum log level to capture
    format: combine(
        colorize(),
        timestamp(),
        myFormat // Use the custom format
    ),
    transports: [
        // Console transport for development
        new transports.Console(),
        // File transports for production (you can add as many as you need)
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;
