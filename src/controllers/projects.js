import { Router } from 'express';
import * as ProjectService from '../services/project';

import { authenticate } from '../middlewares/authenticate';

const router = Router();

/**
 * GET /projects
 */
router.get('/', authenticate, (req, res, next) => {
  ProjectService.getAllProjects({ token: req.session.accessToken })
    .then(projects => {
      res.render('projects/index', { projects });
    })
    .catch(err => {
      next(err);
    });
});

export default router;
