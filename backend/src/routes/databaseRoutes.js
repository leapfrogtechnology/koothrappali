import { Router } from 'express';

import * as databaseController from '../controllers/databases';

const router = Router();

/**
 * GET /api/databases
 */
router.get('/', databaseController.fetchAll);

export default router;
