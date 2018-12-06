import { Router } from 'express';

import * as bucketController from '../controllers/buckets';

const router = Router();

/**
 * GET /api/buckets
 */
router.get('/', bucketController.fetchAll);

export default router;
