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
exports.authService = void 0;
const auth_1 = require("../domain/auth");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userRegisterservice(param) {
    return __awaiter(this, void 0, void 0, function* () {
        param.password = bcrypt.hashSync(param.password, 10);
        const data = yield auth_1.authDomain.userRegisterDomain(param);
        return {
            name: data.name,
            email: data.email,
        };
    });
}
function userLogin(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield auth_1.authDomain.userLogin(param);
        if (!user) {
            throw new Error("User not found");
        }
        var isPasswordValid = bcrypt.compareSync(param.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const payload = {
            id: user === null || user === void 0 ? void 0 : user._id,
        };
        console.log(payload);
        var accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || "default_secret_key", {
            expiresIn: 86400,
        });
        return {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            accessToken: accessToken,
        };
    });
}
exports.authService = {
    userRegisterservice,
    userLogin,
};
