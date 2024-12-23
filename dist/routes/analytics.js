"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../utils/error");
const analytics_1 = require("../controller/analytics");
const auth_1 = __importDefault(require("../middleware/auth"));
const analyticsRoutes = (0, express_1.Router)();
analyticsRoutes.get("/api/:shortId", (0, error_1.handleError)(auth_1.default), (0, error_1.handleError)(analytics_1.GetAnyticsofAlias));
analyticsRoutes.get("/topic/:topic", (0, error_1.handleError)(auth_1.default), (0, error_1.handleError)(analytics_1.GetAnayticsByTopic));
analyticsRoutes.get("/overall", (0, error_1.handleError)(auth_1.default), (0, error_1.handleError)(analytics_1.GetOverAllAnalytics));
exports.default = analyticsRoutes;
