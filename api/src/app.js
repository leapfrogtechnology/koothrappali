import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes';
import config from './config';
import json from './middlewares/json';
import { logger, logStream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

app.locals.title = config.app.name;
app.locals.version = config.app.version;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use('/api', routes);

// Swagger UI
// Hack around changing URL for swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624
const swaggerIndexContent = fs
  .readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace('https://petstore.swagger.io/v2/swagger.json', '/api/swagger.json');

app.get('/api-docs/index.html', (req, res) => res.send(swaggerIndexContent));
app.get('/api-docs', (req, res) => res.redirect('/api-docs/index.html'));
app.use('/api-docs', express.static(pathToSwaggerUi));

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

// Catch unhandled rejections
process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection', err);
  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', err => {
  logger.error('Uncaught exception', err);
  process.exit(1);
});

export default app;
