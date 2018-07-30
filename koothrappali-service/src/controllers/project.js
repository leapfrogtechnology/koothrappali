import { Router } from 'express';

import * as ProjectService from '../services/project';
import * as VaultService from '../services/vault';
import common from '../htttpResponse/response';
process.env.DEBUG = 'node-vault';

const router = Router();

/**
 * GET lms projects
 */
router.get('/lms', (req, res, next) => {
  ProjectService.getAllProjects()
    .then((projects) => ProjectService.filterProjects(projects))
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
 * GET aws instances by aws id
 */
router.get('/instances', (req, res, next) => {
  ProjectService.getProjectByAWSId(req.query.awsId)
    .then((projectDetails) => ProjectService.getAwsInstance(projectDetails, req.query.instanceName))
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
});

/**
 * GET database instance from rds by aws id
 */
router.get('/rds', (req, res, next) => {
  ProjectService.getRdsInstanceByAWSId(req.query.awsId)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
 * GET list of buckets from s3 by aws id
 */
router.get('/buckets', (req, res, next) => {
  ProjectService.listBucketNames(req.query.awsId)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

// /**
// * GET bucket details from s3 by aws id
// */
// router.get('/buckets/:bucketName', (req, res, next) => {
//   ProjectService.getBucketByBucketName(req.query.awsId, req.params.bucketName)
//     .then(data => common.success(res, { data }))
//     .catch(err => next(err));
// })

/**
 * GET ec2 instance price
 */
router.get('/ec2/instances/:instanceId/price', (req, res, next) => {
  let priceInfo;
  let instanceInfo;

  ProjectService.getAwsInstanceByInstanceId(req.params.instanceId)
    .then((instance) => {
      instanceInfo = instance;

      return VaultService.getEC2Price(instance.platform);
    })
    .then((price) => {
      priceInfo = price.data;

      return ProjectService.getVolume(req.params.instanceId)
    })
    .then((volumeSize) => ProjectService.calculateBillingDetail(volumeSize, priceInfo, instanceInfo))
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
 * GET rds instance price
 */
router.get('/rds/:dbInstanceIdentifier/price', (req, res, next) => {
  let priceInfo;
  let instanceInfo;
  ProjectService.getRdsByDBInstanceIdentifier(req.params.dbInstanceIdentifier)
    .then((instance) => {
      instanceInfo = instance;

      return VaultService.getRDSPrice(instance.Engine);
    })
    .then((price) => {
      priceInfo = price.data;

      return ProjectService.calculateRDSBillingDetail(priceInfo, instanceInfo)
    })
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

/**
 * GET s3 instance price by aws id
 */
router.get('/buckets/:bucketName/price', (req, res, next) => {
  ProjectService.getBucketByBucketName(req.params.bucketName)
    .then((bucketInfo) => ProjectService.calculateS3Billing(bucketInfo))
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

export default router;
