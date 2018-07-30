import * as httpUtil from '../utils/httpUtil';
import { CONSTANTS } from '../constants/constants.js';

export function fetchProjectByAWSId(awsId) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.INSTANCES}?awsId=${awsId}`);
}

export function fetchS3BucketByAWSId(awsId) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.BUCKETS}?awsId=${awsId}`);
}

export function fetchRDSByAWSId(awsId) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.RDS}?awsId=${awsId}`);
}

export function fetchEC2InstancePrice(id) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.EC2_PATH}/${id}/${CONSTANTS.API_CALLER.PRICE}`);
}

export function fetchRDSInstancePrice(id) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.RDS}/${id}/${CONSTANTS.API_CALLER.PRICE}`);
}

export function fetchS3InstancePrice(bucketName) {
    return httpUtil.get(`${CONSTANTS.API_CALLER.BASE_URL}/${CONSTANTS.API_CALLER.BUCKETS}/${bucketName}/${CONSTANTS.API_CALLER.PRICE}`);
}
