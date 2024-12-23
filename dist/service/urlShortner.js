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
exports.shortUrlService = void 0;
const shortid = require("shortid");
const urlShortner_1 = require("../domain/urlShortner");
const constant_1 = require("../utils/constant");
const analytics_1 = require("../domain/analytics");
function handleCreateShortUrl(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const shortId = params.customAlias || shortid.generate();
        const useParam = {
            shortId,
            topic: params.topic || "activation",
            redirectURL: params.longurl,
            userID: params.userID,
            createdAt: new Date(),
        };
        const data = yield urlShortner_1.shortUrlDomain.handleCreateShortUrl(useParam);
        const response = {
            shortUrl: data.shortId,
            createdAt: data.createdAt,
        };
        return response;
    });
}
function handleRedirectShortUrl(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield urlShortner_1.shortUrlDomain.handleRedirectShortUrl(params);
        //Geting OS details
        const osDetails = yield (0, constant_1.getOsDetails)();
        const useParams = {
            totalClicks: 1,
            urlShortnerID: data === null || data === void 0 ? void 0 : data.id,
            uniqueClicks: [osDetails === null || osDetails === void 0 ? void 0 : osDetails.ip],
            clicksByDate: [
                {
                    date: new Date().toISOString().split("T")[0],
                    clickCount: 1,
                },
            ],
            osType: [
                {
                    osName: `${osDetails.os}`,
                    uniqueClicks: [osDetails === null || osDetails === void 0 ? void 0 : osDetails.ip],
                    uniqueUsers: [osDetails === null || osDetails === void 0 ? void 0 : osDetails.ip],
                },
            ],
            deviceType: [
                {
                    deviceName: `${osDetails.devicetype}`,
                    uniqueClicks: [osDetails === null || osDetails === void 0 ? void 0 : osDetails.ip],
                    uniqueUsers: [osDetails === null || osDetails === void 0 ? void 0 : osDetails.ip],
                },
            ],
        };
        const existingDoc = yield analytics_1.analyticsDomain.FindOne(useParams);
        if (existingDoc) {
            const updateOS = yield analytics_1.analyticsDomain.UpdateOS(useParams, existingDoc);
        }
        else {
            const insert = yield analytics_1.analyticsDomain.Insert(useParams);
        }
        console.log(useParams);
        return data;
    });
}
exports.shortUrlService = {
    handleCreateShortUrl,
    handleRedirectShortUrl,
};
