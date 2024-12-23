"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const error_1 = require("../utils/error");
const auth_1 = require("../middleware/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/get-all", (0, error_1.handleError)(auth_1.verifyToken), (0, error_1.handleError)(user_1.getAllUser));
exports.default = userRoutes;
