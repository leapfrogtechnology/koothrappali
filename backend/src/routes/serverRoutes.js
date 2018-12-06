import { Router } from 'express';

import * as serverController from '../controllers/servers';

const router = Router();

/**
 * GET /api/servers
 */
router.get('/', serverController.fetchAll);

export default router;
