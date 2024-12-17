import { Router } from "express";
import { getAllUser } from "../controller/user";
import { handleError } from "../utils/error";
import { userLoginHandler, userRegister } from "../controller/auth";

const authRoutes = Router();
authRoutes.post("/register", handleError(userRegister));
authRoutes.post("/login", handleError(userLoginHandler));

export default authRoutes;
