import AWS from 'aws-sdk';

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_SECRET,
  region: process.env.REGION
});

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
