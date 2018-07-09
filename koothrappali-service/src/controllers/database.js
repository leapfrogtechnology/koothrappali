import AWS from 'aws-sdk';
import { Router } from 'express';
import common from '../htttpResponse/response';
import DatabaseService from '../services/databaseService';

let router = Router();
let databaseService = new DatabaseService();

/**
 * GET RDS 
 */
router.get('/dbInstances', (req, res, next) => {
    databaseService.getDatabaseInstances(req.params.bucketName)
        .then(data => common.success(res, { data }))
        .catch(err => next(err));
})
export default router;
