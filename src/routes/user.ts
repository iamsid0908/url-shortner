import { Router } from "express";
import { getAllUser } from "../controller/user";
import { handleError } from "../utils/error";
import { verifyToken } from "../middleware/auth";

const userRoutes = Router();
userRoutes.get("/get-all", handleError(verifyToken), handleError(getAllUser));

export default userRoutes;
