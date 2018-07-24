import AWS from 'aws-sdk';
import CONFIG from '../constants';

const { AWS_KEYS } = CONFIG;

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_SECRET_KEY,
  region: process.env.REGION
});

export function updateKey(id) {
  let accessKey = `ACCESS_KEY_ID_${id}`;
  let secretKey = `APP_SECRET_KEY_${id}`;
  let accessKeyValue = AWS_KEYS[accessKey];
  let secretKeyValue = AWS_KEYS[secretKey];

  if (!accessKeyValue || !secretKeyValue)
    throw new Error('The project is not being hosted');

  AWS.config.update({
    accessKeyId: accessKeyValue,
    secretAccessKey: secretKeyValue,
    region: process.env.REGION
  });
}

export function describeInstances(params) {
  return new AWS.EC2().describeInstances(params);
}

export function describeInstancesWithoutFilter() {
  return new AWS.EC2().describeInstances();
}

export function describeDBInstances(params) {
  return new AWS.RDS().describeDBInstances(params);
}

export function listBuckets() {
  return new AWS.S3().listBuckets();
}

export function listObjectsV2(params) {
  return new AWS.S3().listObjectsV2(params);
}

export function describeVolumes(params) {
  return new AWS.EC2().describeVolumes(params);
}

