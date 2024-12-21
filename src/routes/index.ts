import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import verifyToken from "../middleware/auth";
import urlShortnerRoutes from "./urlShortner";
import analyticsRoutes from "./analytics";
const path = require("path");

const globalRoutes = Router();

globalRoutes.get("/healthCheck", (req, res) => {
  res.status(200).send({ message: "working" });
});

globalRoutes.use("/user", userRoutes);
globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/url-shortner", urlShortnerRoutes);
globalRoutes.use("/analytics", analyticsRoutes);

export default globalRoutes;
