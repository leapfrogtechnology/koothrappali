import AWS from 'aws-sdk';

import config from '../config';

AWS.config.loadFromPath('./cred.json');

/**
 * Get all EC2 Locations
 *
 * @returns {Array}
 */
export function fetchAllEC2Locations() {
  return new Promise((resolve, reject) => {
    const aws = new AWS.EC2({ apiVersion: config.aws.version });
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
 * @returns {Array}
 */
export function fetchAllRDSLocations() {
  return new Promise((resolve, reject) => {
    const aws = new AWS.EC2({ apiVersion: config.aws.version });
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
 * @returns {Array}
 */
export function fetchAllS3Locations() {
  return new Promise((resolve, reject) => {
    const aws = new AWS.EC2({ apiVersion: config.aws.version });
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
