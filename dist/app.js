"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorTracking_1 = require("./errorTracking");
process.on('uncaughtException', (error) => {
    (0, errorTracking_1.default)(error);
});
process.on('unhandledRejection', (reason, promise) => {
    (0, errorTracking_1.default)(reason);
});
throw new Error("This is a test error to verify logging");
