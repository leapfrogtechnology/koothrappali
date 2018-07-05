import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import awsController from './controllers/aws';
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

router.use('/aws', awsController);
router.use('/', projectsController);
router.use('/api/auth', authAPIController);
router.use('/api/projects', projectsAPIController);

export default router;
