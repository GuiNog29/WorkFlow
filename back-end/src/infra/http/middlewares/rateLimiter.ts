import Redis from 'ioredis';
import { AppError } from '@common/exceptions/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    const rateLimiterRes = await limiter.get(request.ip)
    if(rateLimiterRes){
      response.setHeader('X-RateLimit-Limit', rateLimiterRes.remainingPoints);
      response.setHeader('X-RateLimit-Reset', Math.ceil((Date.now() + rateLimiterRes.msBeforeNext) / 1000).toString());
    }

    return next();
  } catch (error) {
    throw new AppError('Muitas requisições.', 429);
  }
}
