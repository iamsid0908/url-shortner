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
exports.getOsDetails = getOsDetails;
const os_1 = __importDefault(require("os"));
const ua_parser_js_1 = require("ua-parser-js");
function getOsDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const parser = new ua_parser_js_1.UAParser();
        const result = parser.getResult();
        const devicetype = result.device || "Laptop";
        const response = yield fetch("https://ipapi.co/json/");
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const data = yield response.json();
        const details = {
            os: os_1.default.type(),
            osarch: os_1.default.arch(),
            devicetype: "Laptop",
            ip: data.ip || " 2401:4900:3b37:bdc4:921:3ee9:cd36:19e6",
            city: data.city || "Bangalore",
            country: data.country_name || "India",
            latitude: data.latitude || "25.6005",
            logitude: data.longitude || "85.1147",
            timezone: data.timezone || "Asia/Mumbai",
        };
        return details;
    });
}
