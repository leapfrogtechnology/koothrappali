import { Router } from 'express';

import * as ProjectService from '../services/project';
import common from '../htttpResponse/response';
process.env.DEBUG = 'node-vault';

const router = Router();

var options = {
  endpoint: 'https://dev.vault.lftechnology.com',
  token: '4fe09a91-077f-86d1-19d8-3f646f683876'
};

var vault = require("node-vault")(options);

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
  ProjectService.getBucketByBucketName(req.params.projectId, req.params.bucketName)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
* GET bucket details from s3
*/
router.get('/:projectId/ec2/pricing', (req, res, next) => {
  let priceInfo;

  vault.read('lftechnology/koothrappali/common/billing/us-east-1/ec2')
    .then((price) => {
      priceInfo = price;

      return ProjectService.getProjectById(req.params.projectId);
    })
    .then((projectDetails) => ProjectService.getAwsInstance(projectDetails, req.query.instanceName))
    .then((instances) => ProjectService.getEc2Pricing(priceInfo, instances))
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

export default router;
