import { version, title, description } from '../package.json';

const config = {
  app: {
    name: title,
    description: description,
    version: version,
    port: process.env.PORT || 8080,
    host: process.env.APP_HOST || '0.0.0.0'
  },
  log: {
    maxDays: '14d',
    dir: process.env.LOG_DIR || 'logs',
    level: process.env.LOG_LEVEL || 'info',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%-debug.log'
  },
  aws: {
    version: '2016-11-15'
  }
};

export default config;
