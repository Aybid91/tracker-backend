const { default: Redis } = require("ioredis");

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

redisClient.on("connect", () =>
  console.log("Connected to Redis successfully."),
);
redisClient.on("error", (error) => console.error("Redis Error:", error));

module.exports = { redisClient };
