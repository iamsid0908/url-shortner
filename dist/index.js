"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes"));
const globalError_1 = require("./utils/globalError");
const session = require("express-session");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
}));
app.set("view engine", "ejs");
app.use("/v1", routes_1.default);
app.use(globalError_1.globalErrorHandler);
app.listen(process.env.PORT, () => {
    console.log("server is running at port http://localhost:" + process.env.PORT);
    (0, db_1.connectMongo)();
    (0, db_1.redis)();
});
