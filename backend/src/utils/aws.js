import AWS from 'aws-sdk';

import config from '../config';

AWS.config.loadFromPath('./cred.json');

/**
 * Get AWS Instances.
 *
 * @returns {Promise}
 */
function getAwsInstance() {
  return new AWS.EC2({ apiVersion: config.aws.version });
}

/**
 * Get new ec2 instance.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function getEC2InstanceFor(region) {
  return new AWS.EC2({ apiVersion: config.aws.version, region: region });
}

/**
 * Get new RDS instance.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function getRDSInstanceFor(region) {
  return new AWS.RDS({ apiVersion: config.aws.version, region: region });
}

/**
 * Get new S3 instance.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function getS3InstanceFor(region) {
  return new AWS.S3({ apiVersion: config.aws.version, region: region });
}

/**
 * Fetch All AWS Locations.
 *
 * @returns {Promise}
 */
export async function fetchAllAWSLocation() {
  const aws = getAwsInstance();
  const data = await aws.describeRegions().promise();
  const regions = data.Regions;
  const response = regions.map(region => region.RegionName);

  return response;
}
