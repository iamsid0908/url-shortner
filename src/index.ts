import express, { NextFunction, Request, Response } from "express";
const app = express();
require("dotenv").config();
import cors from "cors";
import { connectMongo } from "./db";
import globalRoutes from "./routes";
import { globalErrorHandler } from "./utils/globalError";
import { Redis } from "ioredis";
const session = require("express-session");

app.use(cors());
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.set("view engine", "ejs");
app.use("/v1", globalRoutes);
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("server is running at port http://localhost:" + process.env.PORT);
  connectMongo();
});
