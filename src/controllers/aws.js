import AWS from 'aws-sdk';
import { Router } from 'express';
import common from '../htttpResponse/response';
import AwsService from '../services/awsService';

let router = Router();
let awsService = new AwsService();

/**
 * Contains all config for the application.
 */
router.get('/config', (request, response) => {
  response.json({
    data: AWS.config
  });
});

/**
 * GET /instances
 */
router.get('/instances', (req, res, next) => {
  awsService
    .getAllReservations()
    .then(reservations => {
      return awsService.getProjectInfo(reservations);
    })
    .then(instances => {
      return awsService.groupInstances(instances);
    })
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
});

/**
 * GET s3 all bucket /buckets
 */
router.get('/buckets', (req, res, next) => {
  awsService.getallS3BucketNames()
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
});

/**
 * GET s3 bucket objects /buckets
 */
router.get('/buckets/:bucketName', (req, res, next) => {
  awsService.getS3BucketObjects(req.params.bucketName)
    .then(data => common.success(res, { data }))
    .catch(err => next(err));
})

export default router;
