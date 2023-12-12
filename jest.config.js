const nextJest = require('next/jest');
const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'node',

    testTimeout: 300000, // Global timeout set to 30 seconds
    setupFilesAfterEnv: ['<rootDir>/testSetup.js'], // Add this line

};

module.exports = createJestConfig(customJestConfig);
