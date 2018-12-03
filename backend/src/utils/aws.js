import AWS from 'aws-sdk';

import config from '../config';

AWS.config.loadFromPath('./cred.json');

/**
 * Get all EC2 Locations
 *
 * @returns {Promise}
 */
export function fetchAllEC2Locations() {
  return new Promise((resolve, reject) => {
    const aws = getAwsInstance();

    aws.describeRegions({}, function(err, data) {
      if (err) {
        reject(err);
      }

      const response = data.Regions.map(
        region => new AWS.EC2({ apiVersion: config.aws.version, region: region.RegionName })
      );

      resolve(response);
    });
  });
}

/**
 * Get all RDS Locations
 *
 * @returns {Promise}
 */
export function fetchAllRDSLocations() {
  return new Promise((resolve, reject) => {
    const aws = getAwsInstance();

    aws.describeRegions({}, function(err, data) {
      if (err) {
        reject(err);
      }

      const response = data.Regions.map(
        region => new AWS.RDS({ apiVersion: config.aws.version, region: region.RegionName })
      );

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

    aws.describeRegions({}, function(err, data) {
      if (err) {
        reject(err);
      }

      const response = data.Regions.map(
        region => new AWS.S3({ apiVersion: config.aws.version, region: region.RegionName })
      );

      resolve(response);
    });
  });
}

/**
 * Get AWS Instances.
 *
 * @returns {Promise}
 */
function getAwsInstance() {
  return new AWS.EC2({ apiVersion: config.aws.version });
}
