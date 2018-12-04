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
export function fetchAllAWSLocation() {
  return new Promise((resolve, reject) => {
    const aws = getAwsInstance();

    aws.describeRegions({}, (err, data) => {
      if (err) {
        reject(err);
      }
      const regions = data.Regions;
      const response = regions.map(region => region.RegionName);

      resolve(response);
    });
  });
}

/**
 * Get all S3 Locations
 *
 * @returns {Promise}
 */
export function fetchAllS3Locations() {
  return new Promise((resolve, reject) => {
    const aws = getAwsInstance();

    aws.describeRegions({}, (err, data) => {
      if (err) {
        reject(err);
      }

      const regions = data.Regions;

      const response = regions.map(region => new AWS.S3({ apiVersion: config.aws.version, region: region.RegionName }));

      resolve(response);
    });
  });
}
