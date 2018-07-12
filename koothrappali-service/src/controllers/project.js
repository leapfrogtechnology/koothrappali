import { Router } from 'express';
import * as ProjectService from '../services/project';

import { authenticate } from '../middlewares/authenticate';
import common from '../htttpResponse/response';

const router = Router();

/**
 * GET lms projects
 */
router.get('/lms', (req, res, next) => {
  ProjectService.getAllProjects({ token: req.session.accessToken })
    .then(data => common.success(res, { data }))
    .catch(err => {
      next(err);
    });
});

/**
 * GET aws projects
 */
router.get('/aws', (req, res, next) => {
  ProjectService.getAllProjects({ token: req.session.accessToken })
    .then(data => common.success(res, { data }))
    .catch(err => {
      next(err);
    });
});

export default router;
