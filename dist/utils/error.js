"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
};
exports.handleError = handleError;
