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
exports.rateLimiter = rateLimiter;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const RATE_LIMIT = 10;
const TIME_WINDOW = 3600;
function rateLimiter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User not found" });
        }
        const redisKey = `rate_limit:${userId}`;
        const currentCount = yield redis.incr(redisKey);
        if (currentCount === 1) {
            yield redis.expire(redisKey, TIME_WINDOW);
        }
        if (currentCount > RATE_LIMIT) {
            return res
                .status(429)
                .json({ message: "Limit exceeded. Try again later." });
        }
        next();
    });
}
