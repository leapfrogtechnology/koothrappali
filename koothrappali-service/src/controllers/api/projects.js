import { Router } from 'express';
import * as ProjectService from '../../services/project';

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', (req, res, next) => {
  ProjectService.getAllProjects()
    .then(response => {
      res.json({ data: response.data });
    })
    .catch(err => {
      next(err);
    });
});

export default router;
