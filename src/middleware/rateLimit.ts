import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { AuthRequest } from "./auth";

const redis = new Redis();

const RATE_LIMIT = 10;
const TIME_WINDOW = 3600;

export async function rateLimiter(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized: User not found" });
  }

  const redisKey = `rate_limit:${userId}`;
  const currentCount = await redis.incr(redisKey);

  if (currentCount === 1) {
    await redis.expire(redisKey, TIME_WINDOW);
  }

  if (currentCount > RATE_LIMIT) {
    return res
      .status(429)
      .json({ message: "Limit exceeded. Try again later." });
  }

  next();
}
