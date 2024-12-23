import mongoose from "mongoose";
const Redis = require("ioredis");

export const connectMongo = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(`${process.env.MONGO_DB}`, {
        autoIndex: true,
      })
      .then(() => {
        console.log("Mongo connected");
        resolve("Mongo connected");
      })
      .catch((err: any) => {
        console.error(err);
        reject(err);
      });
  });
};

export const redis = async () => {
  const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost", // Default to localhost for local dev
    port: process.env.REDIS_PORT || 6379,
  });

  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err: any) => {
    console.error("Redis connection error:", err);
  });
};
