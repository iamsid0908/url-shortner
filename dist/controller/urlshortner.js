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
exports.handleCreateShortUrl = handleCreateShortUrl;
exports.handleRedirectShortUrl = handleRedirectShortUrl;
const urlShortner_1 = require("../service/urlShortner");
function handleCreateShortUrl(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const param = req.body;
        if (!param.longurl) {
            return res.status(400).json({ message: "Long Url is required" });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User not found" });
        }
        const data = yield urlShortner_1.shortUrlService.handleCreateShortUrl(Object.assign(Object.assign({}, param), { userID: userId }));
        const response = {
            message: "Success",
            data: data,
        };
        return res.status(201).json(response);
    });
}
function handleRedirectShortUrl(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.shortId;
        const data = yield urlShortner_1.shortUrlService.handleRedirectShortUrl(param);
        if (typeof (data === null || data === void 0 ? void 0 : data.redirectURL) === "string") {
            return res.redirect(data.redirectURL);
        }
    });
}
