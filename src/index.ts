import express, { NextFunction, Request, Response } from "express";
const app = express();
require("dotenv").config();
import cors from "cors";
import { connectMongo } from "./db";
import globalRoutes from "./routes";
import { globalErrorHandler } from "./utils/globalError";

app.use(cors());
app.use(express.json());
app.use("/v1", globalRoutes);
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("server is running at port http://localhost:" + process.env.PORT);
  connectMongo();
});
