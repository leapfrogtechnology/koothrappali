import { Router } from 'express';
import common from '../htttpResponse/response';
import StorageService from '../services/storageService';

let router = Router();
let storageService = new StorageService();

/**
 * GET s3 all bucket /buckets
 */
router.get('/buckets', (req, res, next) => {
    storageService.getallS3BucketNames()
        .then(data => common.success(res, { data }))
        .catch(err => next(err));
});

/**
 * GET s3 bucket objects /buckets/:bucketName
 */
router.get('/buckets/:bucketName', (req, res, next) => {
    storageService.getS3BucketObjects(req.params.bucketName)
        .then(data => common.success(res, { data }))
        .catch(err => next(err));
})

export default router;
