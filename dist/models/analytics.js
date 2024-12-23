"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AnalyticSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        auto: true,
    },
    totalClicks: {
        type: Number,
        required: true,
    },
    uniqueClicks: {
        type: [String],
        required: true,
    },
    urlShortnerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "url",
        required: true,
    },
    clicksByDate: [
        {
            date: { type: String },
            clickCount: { type: Number },
        },
    ],
    osType: [
        {
            osName: { type: String, required: true },
            uniqueClicks: { type: [String], required: true },
            uniqueUsers: { type: [String], required: true },
        },
    ],
    deviceType: [
        {
            deviceName: { type: String },
            uniqueClicks: { type: [String] },
            uniqueUsers: { type: [String] },
        },
    ],
});
const AnalyticsModel = mongoose_1.default.model("Analytics", AnalyticSchema);
exports.default = AnalyticsModel;