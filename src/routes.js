import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import projectsController from './controllers/projects';
import projectsAPIController from './controllers/api/projects';
import authAPIController from './controllers/api/auth';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.use('/api/projects', projectsAPIController);
router.use('/api/auth', authAPIController);

router.use('/', projectsController);

export default router;
