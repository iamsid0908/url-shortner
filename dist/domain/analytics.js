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
exports.analyticsDomain = void 0;
const analytics_1 = __importDefault(require("../models/analytics"));
function FindOne(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDoc = yield analytics_1.default.findOne({
            urlShortnerID: params.urlShortnerID,
        });
        return existingDoc;
    });
}
function Insert(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDoc = new analytics_1.default(params);
        return yield newDoc.save();
    });
}
function UpdateOS(params, existingDoc) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        //updating os type
        const updatedOsTypes = params.osType.map((incomingOs) => {
            const existingOs = existingDoc.osType.find((os) => os.osName === incomingOs.osName);
            if (existingOs) {
                if (!existingOs.uniqueClicks.includes(incomingOs.uniqueClicks[0])) {
                    existingOs.uniqueClicks.push(incomingOs.uniqueClicks[0]);
                }
                if (!existingOs.uniqueUsers.includes(incomingOs.uniqueUsers[0])) {
                    existingOs.uniqueUsers.push(incomingOs.uniqueUsers[0]);
                }
            }
            else {
                existingDoc.osType.push(incomingOs);
            }
            return existingOs || incomingOs;
        });
        //Updating device type
        const updatedDeviceTypes = params.deviceType.map((incomingOs) => {
            const existingOs = existingDoc.deviceType.find((device) => device.deviceName === incomingOs.deviceName);
            if (existingOs) {
                if (!existingOs.uniqueClicks.includes(incomingOs.uniqueClicks[0])) {
                    existingOs.uniqueClicks.push(incomingOs.uniqueClicks[0]);
                }
                if (!existingOs.uniqueUsers.includes(incomingOs.uniqueUsers[0])) {
                    existingOs.uniqueUsers.push(incomingOs.uniqueUsers[0]);
                }
            }
            else {
                existingDoc.deviceType.push(incomingOs);
            }
            return existingOs || incomingOs;
        });
        //Updating by date
        const updateClickByDate = (_a = params.clicksByDate) === null || _a === void 0 ? void 0 : _a.map((incomingDate) => {
            const existingDate = existingDoc.clicksByDate.find((clickDate) => clickDate.date === incomingDate.date);
            if (existingDate) {
                if (incomingDate.clickCount !== undefined) {
                    existingDate.clickCount += incomingDate.clickCount;
                }
            }
            else {
                existingDoc.clicksByDate.push(incomingDate);
            }
            return existingDate || incomingDate;
        });
        existingDoc.totalClicks += params.totalClicks;
        params.uniqueClicks.forEach((click) => {
            if (!existingDoc.uniqueClicks.includes(click)) {
                existingDoc.uniqueClicks.push(click);
            }
        });
        existingDoc.clicksByDate = params.clicksByDate;
        yield existingDoc.save();
    });
}
function GetById(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield analytics_1.default.findOne({ urlShortnerID: params._id });
        if (!data) {
            throw new Error("URL not found");
        }
        return data;
    });
}
function FindListByIDs(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const idValues = ids.map((id) => id._id);
        const results = yield analytics_1.default.find({
            urlShortnerID: { $in: idValues },
        });
        return results;
    });
}
exports.analyticsDomain = {
    FindOne,
    UpdateOS,
    Insert,
    GetById,
    FindListByIDs,
};
