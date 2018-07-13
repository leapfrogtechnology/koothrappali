import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import projectController from './controllers/project';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.use('/projects', projectController);

export default router;
