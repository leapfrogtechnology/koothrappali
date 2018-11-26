import { Router } from 'express';

import * as instanceController from '../controllers/instances';

const router = Router();

/**
 * GET /api/instances
 */
router.get('/', instanceController.fetchAll);

export default router;
