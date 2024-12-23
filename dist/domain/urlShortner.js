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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortUrlDomain = void 0;
const urlShortner_1 = __importDefault(require("../models/urlShortner"));
function handleCreateShortUrl(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield urlShortner_1.default.create({
            shortId: params.shortId,
            topic: params.topic,
            redirectURL: params.redirectURL,
            userID: params.userID,
            createdAt: params.createdAt || new Date(),
        });
        return data;
    });
}
function handleRedirectShortUrl(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield urlShortner_1.default.findOne({ shortId: params });
        return data;
    });
}
function FindOneByShortID(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDoc = yield urlShortner_1.default.findOne({
            shortId: params,
        });
        if (!existingDoc) {
            throw new Error("short_id doc not found");
        }
        return existingDoc;
    });
}
function GetAnayticsByTopic(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof params.topic !== "string") {
            console.error("Topic is not a string:", params.topic);
            throw new Error(`Invalid topic: ${JSON.stringify(params.topic)}`);
        }
        const topic = params.topic;
        const userID = params.userID;
        const results = yield urlShortner_1.default.find({ topic, userID }).lean();
        return results;
    });
}
function GetUrlListByYUserId(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield urlShortner_1.default.find({ userID }).lean();
        return results;
    });
}
exports.shortUrlDomain = {
    handleCreateShortUrl,
    handleRedirectShortUrl,
    FindOneByShortID,
    GetAnayticsByTopic,
    GetUrlListByYUserId,
};
