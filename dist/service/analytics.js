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
exports.analyticService = void 0;
const analytics_1 = require("../domain/analytics");
const urlShortner_1 = require("../domain/urlShortner");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
function GetAnyticsofAlias(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const urlData = yield urlShortner_1.shortUrlDomain.FindOneByShortID(params);
        if (!urlData) {
            throw new Error("short_id data is not found");
        }
        const data = yield analytics_1.analyticsDomain.GetById(urlData);
        if (!data) {
            throw new Error("analytics data is not found");
        }
        const response = {
            totalClicks: data.totalClicks,
            uniqueClicks: data.uniqueClicks.length,
            urlShortnerID: data.urlShortnerID,
            clicksByDate: (_a = data.clicksByDate) === null || _a === void 0 ? void 0 : _a.map((item) => ({
                date: item.date,
                clickCount: item.clickCount,
            })),
            osType: data.osType.map((os) => ({
                osName: os.osName,
                uniqueClicks: os.uniqueClicks.length,
                uniqueUsers: os.uniqueUsers.length,
            })),
            deviceType: data.deviceType.map((device) => ({
                deviceName: device.deviceName,
                uniqueClicks: device.uniqueClicks.length,
                uniqueUsers: device.uniqueUsers.length,
            })),
        };
        return response;
    });
}
function GetAnayticsByTopic(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { topic, userID } = params;
        const cacheKey = `analytics:${userID}:${topic}`;
        // Try fetching the data from Redis
        const cachedData = yield redis.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const data = yield urlShortner_1.shortUrlDomain.GetAnayticsByTopic(params);
        const ids = data.map((item) => ({
            _id: item._id,
            shortId: item.shortId,
        }));
        const results = yield analytics_1.analyticsDomain.FindListByIDs(ids);
        let totalclicks = 0;
        let uniqueclicks = 0;
        results.map((item) => {
            totalclicks += item.totalClicks;
            uniqueclicks += item.uniqueClicks.length;
        });
        let response = {
            totalClicks: totalclicks,
            uniqueClicks: uniqueclicks,
            clicksByDate: [],
            urls: [],
        };
        const idToShortUrlMap = new Map(ids.map((id) => [id._id.toString(), id.shortId]));
        results.forEach((item) => {
            var _a;
            const clicksByDate = (_a = item.clicksByDate) === null || _a === void 0 ? void 0 : _a.map((dateItem) => {
                var _a;
                return ({
                    date: dateItem.date ? String(dateItem.date) : "Unknown Date",
                    totalClicks: (_a = dateItem.clickCount) !== null && _a !== void 0 ? _a : 0,
                });
            });
            if (clicksByDate) {
                response.clicksByDate.push(...clicksByDate);
            }
            const shortUrl = idToShortUrlMap.get(item.urlShortnerID.toString()) || "Unknown";
            response.urls.push({
                shortUrl,
                totalClicks: item.totalClicks,
                uniqueClicks: item.uniqueClicks.length,
            });
        });
        yield redis.set(cacheKey, JSON.stringify(response), "EX", 600);
        return response;
    });
}
function GetOverAllAnalytics(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheKey = `overall:${userID}`;
        // Try fetching the data from Redis
        const cachedData = yield redis.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const data = yield urlShortner_1.shortUrlDomain.GetUrlListByYUserId(userID);
        const ids = data.map((item) => ({
            _id: item._id,
        }));
        const results = yield analytics_1.analyticsDomain.FindListByIDs(ids);
        let totalclicks = 0;
        let uniqueclicks = 0;
        results.map((item) => {
            totalclicks += item.totalClicks;
            uniqueclicks += item.uniqueClicks.length;
        });
        // Creating reponse
        const response = {
            totalUrls: ids.length,
            totalClicks: totalclicks,
            uniqueClicks: uniqueclicks,
            clicksByDate: [],
            osType: [],
            deviceType: [],
        };
        results.forEach((item) => {
            var _a, _b, _c;
            const clicksByDate = (_a = item.clicksByDate) === null || _a === void 0 ? void 0 : _a.map((dateItem) => {
                var _a;
                return ({
                    date: dateItem.date ? String(dateItem.date) : "Unknown Date",
                    totalClicks: (_a = dateItem.clickCount) !== null && _a !== void 0 ? _a : 0,
                });
            });
            if (clicksByDate) {
                response.clicksByDate.push(...clicksByDate);
            }
            const osTypes = (_b = item.osType) === null || _b === void 0 ? void 0 : _b.map((osItem) => ({
                osName: osItem.osName,
                uniqueClicks: osItem.uniqueClicks.length,
                uniqueUsers: osItem.uniqueUsers.length,
            }));
            if (osTypes) {
                response.osType.push(...osTypes);
            }
            const deviceTypes = (_c = item.deviceType) === null || _c === void 0 ? void 0 : _c.map((deviceItem) => ({
                deviceName: deviceItem.deviceName,
                uniqueClicks: deviceItem.uniqueClicks.length,
                uniqueUsers: deviceItem.uniqueUsers.length,
            }));
            if (deviceTypes) {
                response.deviceType.push(...deviceTypes);
            }
        });
        // Adding same date,Os and Ostype
        response.clicksByDate = response.clicksByDate.reduce((acc, item) => {
            const existing = acc.find((entry) => entry.date === item.date);
            if (existing) {
                existing.totalClicks += item.totalClicks;
            }
            else {
                acc.push(item);
            }
            return acc;
        }, []);
        response.osType = response.osType.reduce((acc, item) => {
            const existing = acc.find((entry) => entry.osName === item.osName);
            if (existing) {
                existing.uniqueClicks += item.uniqueClicks;
                existing.uniqueUsers += item.uniqueUsers;
            }
            else {
                acc.push(item);
            }
            return acc;
        }, []);
        response.deviceType = response.deviceType.reduce((acc, item) => {
            const existing = acc.find((entry) => entry.deviceName === item.deviceName);
            if (existing) {
                existing.uniqueClicks += item.uniqueClicks;
                existing.uniqueUsers += item.uniqueUsers;
            }
            else {
                acc.push(item);
            }
            return acc;
        }, []);
        yield redis.set(cacheKey, JSON.stringify(response), "EX", 600);
        return response;
    });
}
exports.analyticService = {
    GetAnyticsofAlias,
    GetAnayticsByTopic,
    GetOverAllAnalytics,
};
