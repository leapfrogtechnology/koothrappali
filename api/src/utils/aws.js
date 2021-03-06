import AWS from 'aws-sdk';
import path from 'path';

import config from '../config';

AWS.config.loadFromPath(path.resolve('./cred.json'));

/**
 * Get an AWS instance.
 *
 * @returns {Promise<Object>}
 */
function getAWSInstance() {
  return new AWS.EC2({ apiVersion: config.aws.version });
}

/**
 * Get new EC2 instance.
 *
 * @param {String} region
 * @returns {Promise<Object>}
 */
export function getEC2InstanceFor(region) {
  return new AWS.EC2({ apiVersion: config.aws.version, region });
}

/**
 * Get new RDS instance.
 *
 * @param {String} region
 * @returns {Promise<Object>}
 */
export function getRDSInstanceFor(region) {
  return new AWS.RDS({ apiVersion: config.aws.version, region });
}

/**
 * Get new S3 instance.
 *
 * @returns {Promise<Object>}
 */
export function getS3Instance() {
  return new AWS.S3({ apiVersion: config.aws.version });
}

/**
 * Fetch all AWS locations.
 *
 * @returns {Promise<Array>}
 */
export async function fetchAllAWSLocation() {
  const aws = getAWSInstance();
  const data = await aws.describeRegions().promise();
  const response = data.Regions.map(region => region.RegionName);

  return response;
}
