import { Request, Response, NextFunction } from 'express';
import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 15,
  duration: 2,
})

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {

    await limiter.consume(request.ip);

    next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}