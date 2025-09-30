import Redis from "ioredis"

// import dotenv from "dotenv" to be able to use the variables of the .env file here below.
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// await redis.set('foo', 'bar');