import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import serverRoutes from './routes/serverRoutes';
import bucketRoutes from './routes/bucketRoutes';
import databaseRoutes from './routes/databaseRoutes';
import instanceRoutes from './routes/instanceRoutes';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/servers', serverRoutes);
router.use('/buckets', bucketRoutes);
router.use('/databases', databaseRoutes);
router.use('/instances', instanceRoutes);

export default router;
