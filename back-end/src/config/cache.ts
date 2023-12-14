import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REGIS_HOST,
      port: process.env.REGIS_PORT,
      password: process.env.REGIS_PASS || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
