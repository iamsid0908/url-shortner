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
exports.redis = exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Redis = require("ioredis");
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        mongoose_1.default
            .connect(`${process.env.MONGO_DB}`, {
            autoIndex: true,
        })
            .then(() => {
            console.log("Mongo connected");
            resolve("Mongo connected");
        })
            .catch((err) => {
            console.error(err);
            reject(err);
        });
    });
});
exports.connectMongo = connectMongo;
const redis = () => __awaiter(void 0, void 0, void 0, function* () {
    const redis = new Redis({
        host: process.env.REDIS_HOST || "localhost", // Default to localhost for local dev
        port: process.env.REDIS_PORT || 6379,
    });
    redis.on("connect", () => {
        console.log("Connected to Redis");
    });
    redis.on("error", (err) => {
        console.error("Redis connection error:", err);
    });
});
exports.redis = redis;
