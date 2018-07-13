import LmsProject from '../model/LmsProject';
// import AwsProject from '../model/AwsProject';
import CONFIG from '../constants';
import _ from 'lodash';

import * as awsUtils from '../utils/aws';

const { LMS_API_KEY, CONSTANTS, PROJECT, DB_INSTANCE_IDENTIFIER } = CONFIG;

import AWS from 'aws-sdk';

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_SECRET,
  region: process.env.REGION
});


/**
 * Get all projects from lms.
 *
 * @return {Promise}
 */
export async function getAllProjects() {
  return LmsProject.getAllProjects();
}

/**
 * Get all projects from aws.
 *
 * @return {Promise}
 */
export async function getAllAwsInstances(instanceType, tagKey) {
  let result = [];
  let instances = '';

  try {
    instances = awsUtils.describeInstances();

    let projectInformations = await instances.promise();
    projectInformations.Reservations.forEach(reservation => { result.push(getProjectDetails(reservation)); });

    return result;
  } catch (err) { throw (err) }
}

function getProjectDetails(reservation) {
  let result = [];
  let project = '';
  reservation.Instances.forEach(instance => {
    for (let tag of instance.Tags) {
      if (tag.Key === CONSTANTS.PROJECT) {
        project = tag.Value;

        break;
      }
    }
    result.push({
      project: project,
      state: instance.State,
      imageId: instance.ImageId,
      instanceId: instance.InstanceId,
      instanceType: instance.InstanceType,
      publicIpAddress: instance.PublicIpAddress
    })
  });

  return result[0];
}

/**
 * Group by projects with same name
 * 
 * @param {Array} instances 
 */
export function groupInstances(instances) {
  let result = _(instances)
    .groupBy(x => x.project)
    .map((value, key) => ({ project: key, instances: value }))
    .value();

  return result;
}

/**
 * Fetch information from rds database
 */
export async function getRdsInstances() {
  try {
    let result = [];
    let rds = new AWS.RDS();
    let params = { DBInstanceIdentifier: DB_INSTANCE_IDENTIFIER };
    let instances = awsUtils.describeDBInstances(params);
    let response = await instances.promise();
    response.DBInstances.forEach(database => {
      result.push({
        DBName: database.DBName,
        DBInstanceClass: database.DBInstanceClass,
        AllocatedStorage: database.AllocatedStorage,
        MultiAZ: database.DBInstanceClass
      });
    });

    return result[0];
  }
  catch (err) { throw (err) }
}

/**
 * Fetch buckets name from s3
 */
export async function getAllBucket() {
  try {
    let bucketName = [];
    let buckets = awsUtils.listBuckets();
    let response = await buckets.promise();
    bucketName = response.Buckets.map(a => a.Name);

    return bucketName;
  }
  catch (err) { throw (err) }
}

/**
 * Fetch details of specific bucket from s3
 */
export async function getBucket(bucketName) {
  try {
    let params = { Bucket: bucketName };
    let bucketObject = awsUtils.listObjectsV2(params);
    let response = await bucketObject.promise();

    return response;
  }
  catch (err) { throw (err) }
}
