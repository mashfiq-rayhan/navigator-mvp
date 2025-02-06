import pino from 'pino';
import { serverEnv } from './env.config.js';

const logLevel = {
  production: 'info',
  development: 'debug',
  test: 'silent',
};

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      ignore: 'pid,hostname',
    },
  },
  level: process.env.NODE_ENV === serverEnv.production ? logLevel.production : logLevel.development,
});

export default logger;
