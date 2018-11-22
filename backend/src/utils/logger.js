import fs from 'fs';
import config from '../config';
import winston, { format } from 'winston';

import 'winston-daily-rotate-file';

// Create log directory if it does not exist
if (!fs.existsSync(config.log.dir)) {
  fs.mkdirSync(config.log.dir);
}

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: config.log.level
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: config.log.maxDays,
      level: config.log.level,
      dirname: config.log.dir,
      datePattern: config.log.datePattern,
      filename: config.log.filename
    })
  ]
});

/**
 * A writable stream for winston logger.
 */
export const logStream = {
  write(message) {
    logger.info(message.toString());
  }
};

export default logger;
