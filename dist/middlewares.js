"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
function notFound(req, res, next) {
    res.status(404);
    var error = new Error("\uD83D\uDD0D - Not Found - " + req.originalUrl);
    next(error);
}
exports.notFound = notFound;
/* eslint-disable no-unused-vars */
function errorHandler(err, _req, res, _next) {
    /* eslint-enable no-unused-vars */
    var statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
exports.errorHandler = errorHandler;
