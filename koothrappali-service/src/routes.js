import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import awsController from './controllers/aws';
import storageontroller from './controllers/storage';
import databaseController from './controllers/database';
import authAPIController from './controllers/api/auth';
import projectsController from './controllers/projects';
import projectsAPIController from './controllers/api/projects';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.use('/api/projects', awsController);
router.use('/', projectsController);
router.use('/api/auth', authAPIController);
router.use('/api/buckets', storageontroller);
router.use('/api/databaseInstances', databaseController);
router.use('/api/projects', projectsAPIController);

export default router;
