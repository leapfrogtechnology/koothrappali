import * as httpUtil from '../utils/httpUtil';

const BASE_URL = 'http://localhost:8848/api/projects';
const INSTANCES = 'instances';
const BUCKETS = 'buckets';
const RDS = 'rds';

export function fetchProjectById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${INSTANCES}`);
}

export function fetchS3BucketById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${BUCKETS}`);
}

export function fetchRDSById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${RDS}`);
}
