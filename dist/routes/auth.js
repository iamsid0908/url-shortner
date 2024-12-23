"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../utils/error");
const auth_1 = require("../controller/auth");
const passport = require("passport");
require("../passport");
const authRoutes = (0, express_1.Router)();
authRoutes.use(passport.initialize());
authRoutes.use(passport.session());
authRoutes.post("/register", (0, error_1.handleError)(auth_1.userRegister));
authRoutes.post("/login", (0, error_1.handleError)(auth_1.userLoginHandler));
// authRoutes.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// authRoutes.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/success",
//     failureRedirect: "/failure",
//   })
// );
// authRoutes.get("/success", handleError(successGoogleLogin));
// authRoutes.get("/failure", handleError(failureGoogleLogin));
exports.default = authRoutes;
