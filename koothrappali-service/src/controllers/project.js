import { Router } from 'express';

import * as ProjectService from '../services/project';
import common from '../htttpResponse/response';

const router = Router();

/**
 * GET lms projects
 */
router.get('/lms', (req, res, next) => {
  ProjectService.getAllProjects()
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
});

/**
 * GET aws instances by project id
 */
router.get('/:projectId/instances', (req, res, next) => {
  ProjectService.getProjectById(req.params.projectId)
    .then((projectDetails) => ProjectService.getAwsInstance(projectDetails, req.query.instanceName))
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
});

/**
 * GET database instance from rds
 */
router.get('/:projectId/rds', (req, res, next) => {
  ProjectService.getRdsInstanceById(req.params.projectId)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
 * GET list of buckets from s3
 */
router.get('/:projectId/buckets', (req, res, next) => {
  ProjectService.listBucketNames(req.params.projectId)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
* GET bucket details from s3
*/
router.get('/:projectId/buckets/:bucketName', (req, res, next) => {
  ProjectService.getBucketByBucketName(req.params.projectId,req.params.bucketName)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})
export default router;
