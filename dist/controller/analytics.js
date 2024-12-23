"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAnyticsofAlias = GetAnyticsofAlias;
exports.GetAnayticsByTopic = GetAnayticsByTopic;
exports.GetOverAllAnalytics = GetOverAllAnalytics;
const analytics_1 = require("../service/analytics");
function GetAnyticsofAlias(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.shortId;
        if (!param) {
            return res.status(400).json({ message: "ShortID is required" });
        }
        const data = yield analytics_1.analyticService.GetAnyticsofAlias(param);
        const response = {
            message: "Success",
            data: data,
        };
        return res.status(201).json(response);
    });
}
function GetAnayticsByTopic(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const topic = req.params.topic;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User not found" });
        }
        if (!topic || typeof topic !== "string") {
            return res.status(400).json({ message: "Invalid or missing topic" });
        }
        const useParam = {
            topic,
            userID: userId,
        };
        const data = yield analytics_1.analyticService.GetAnayticsByTopic(useParam);
        const response = {
            message: "Success",
            data: data,
        };
        return res.status(201).json(response);
    });
}
function GetOverAllAnalytics(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User not found" });
        }
        const data = yield analytics_1.analyticService.GetOverAllAnalytics(userId);
        const response = {
            message: "Success",
            data: data,
        };
        return res.status(201).json(response);
    });
}
