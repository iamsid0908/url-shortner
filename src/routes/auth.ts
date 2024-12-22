import { Router } from "express";
import { handleError } from "../utils/error";
import {
  failureGoogleLogin,
  successGoogleLogin,
  userLoginHandler,
  userRegister,
} from "../controller/auth";
const passport = require("passport");
require("../passport");

const authRoutes = Router();

authRoutes.use(passport.initialize());
authRoutes.use(passport.session());

authRoutes.post("/register", handleError(userRegister));
authRoutes.post("/login", handleError(userLoginHandler));
authRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

authRoutes.get("/success", handleError(successGoogleLogin));

authRoutes.get("/failure", handleError(failureGoogleLogin));

export default authRoutes;
