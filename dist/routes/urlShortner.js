"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../utils/error");
const urlshortner_1 = require("../controller/urlshortner");
const auth_1 = __importDefault(require("../middleware/auth"));
const rateLimit_1 = require("../middleware/rateLimit");
const urlShortnerRoutes = (0, express_1.Router)();
urlShortnerRoutes.post("/shorten", (0, error_1.handleError)(auth_1.default), (0, error_1.handleError)(rateLimit_1.rateLimiter), (0, error_1.handleError)(urlshortner_1.handleCreateShortUrl));
urlShortnerRoutes.get("/redirect/shorten/:shortId", (0, error_1.handleError)(urlshortner_1.handleRedirectShortUrl));
exports.default = urlShortnerRoutes;
