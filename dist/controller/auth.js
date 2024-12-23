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
exports.failureGoogleLogin = exports.successGoogleLogin = exports.loadAuth = void 0;
exports.userRegister = userRegister;
exports.userLoginHandler = userLoginHandler;
const auth_1 = require("../service/auth");
function userRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.body;
        if (!param.name || !param.email || !param.password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const savedUser = yield auth_1.authService.userRegisterservice(param);
        const response = {
            message: "User created successfully",
            data: {
                name: savedUser.name,
                email: savedUser.email,
            },
        };
        return res.status(201).json(response);
    });
}
function userLoginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.body;
        if (!param.email || !param.password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const data = yield auth_1.authService.userLogin(param);
        const response = {
            message: "User created successfully",
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                accessToken: data.accessToken,
            },
        };
        return res.status(201).json(response);
    });
}
const loadAuth = (req, res) => {
    res.render("auth");
};
exports.loadAuth = loadAuth;
const successGoogleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        res.status(200).json({
            message: "Login successful",
            user: req.user,
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.successGoogleLogin = successGoogleLogin;
const failureGoogleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Error");
});
exports.failureGoogleLogin = failureGoogleLogin;
