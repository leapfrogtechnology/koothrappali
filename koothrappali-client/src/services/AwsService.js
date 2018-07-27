import * as httpUtil from '../utils/httpUtil';

const BASE_URL = 'http://localhost:8848/api/projects';
const INSTANCES = 'instances';
const BUCKETS = 'buckets';
const RDS = 'rds';
const EC2_PATH = 'ec2/instances';
const PRICE = 'price';

export function fetchProjectById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${INSTANCES}`);
}

export function fetchS3BucketById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${BUCKETS}`);
}

export function fetchRDSById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${RDS}`);
}

export function fetchEC2InstancePrice(id) {
    return httpUtil.get(`${BASE_URL}/${EC2_PATH}/${id}/${PRICE}`);
}

export function fetchRDSInstancePrice(id) {
    return httpUtil.get(`${BASE_URL}/${RDS}/${id}/${PRICE}`);
}
