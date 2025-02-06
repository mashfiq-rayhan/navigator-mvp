import { v4 as uuidv4 } from 'uuid';

import logger from '../config/logger.config.js';

export const requestLogger = (req, res, next) => {
  // Generate a unique ID for the request
  const requestId = uuidv4();
  req.requestId = requestId;

  const { method, url, headers, body } = req;
  const start = Date.now();

  // Log the incoming request
  logger.info(
    {
      requestId,
      method,
      url,
      headers,
      body,
    },
    'Incoming Request',
  );

  // Hook into the response `finish` event
  res.on('finish', () => {
    const responseTime = Date.now() - start;

    logger.info(
      {
        requestId,
        method,
        url,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
      },
      'Outgoing Response',
    );
  });

  next();
};
