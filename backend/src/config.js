import { version, title, description } from '../package.json';
const config = {
  app: {
    name: title || 'Koothrapali',
    description: description || '',
    version: version || '0.0.0',
    port: process.env.PORT || 8080,
    host: process.env.APP_HOST || '0.0.0.0'
  },
  sentry: {
    dsn: ''
  },
  log: {
    maxDays: '14d',
    dir: process.env.LOG_DIR || 'logs',
    level: process.env.LOG_LEVEL || 'info',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%-debug.log'
  }
};

export default config;
