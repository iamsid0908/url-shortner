"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const urlShortner_1 = __importDefault(require("./urlShortner"));
const analytics_1 = __importDefault(require("./analytics"));
const path = require("path");
const globalRoutes = (0, express_1.Router)();
globalRoutes.get("/healthCheck", (req, res) => {
    res.status(200).send({ message: "working" });
});
globalRoutes.use("/user", user_1.default);
globalRoutes.use("/auth", auth_1.default);
globalRoutes.use("/url-shortner", urlShortner_1.default);
globalRoutes.use("/analytics", analytics_1.default);
exports.default = globalRoutes;
