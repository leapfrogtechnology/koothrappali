import _ from 'lodash';

import CONFIG from '../constants';
import * as awsUtils from '../utils/aws';
import LmsProject from '../model/LmsProject';
import * as vaultUtils from '../utils/vaultUtils';

const { CONSTANTS, DB_INSTANCE_IDENTIFIER, PROJECTS } = CONFIG;

/**
 * Get all projects from lms.
 *
 * @return {Promise}
 */
export async function getAllProjects() {
  return LmsProject.getAllProjects();
}

/**
 * Show only those projects in aws
 * 
 * @param {Array} projects 
 */
export function filterProjects(projects) {
  let result = projects.filter(project =>
    project.name === PROJECTS.FHF ||
    project.name === PROJECTS.CUMMINGS ||
    project.name === PROJECTS.REMIT ||
    project.name === PROJECTS.LINKWAY ||
    project.name === PROJECTS.NFPA ||
    project.name === PROJECTS.KEYOLO ||
    project.name === PROJECTS.ECOSWEEP ||
    project.name === PROJECTS.BIIDME ||
    project.name === PROJECTS.LEAPFROG ||
    project.name === PROJECTS.MUSASHI ||
    project.name === PROJECTS.LAUDIO ||
    project.name === PROJECTS.TRAKTIVITY ||
    project.name === PROJECTS.SUPPERLOAN
  );

  return result;
}

/**
 * Get project by id from lms.
 *
 * @return {Promise}
 */
export async function getProjectById(id) {
  return LmsProject.getProjectById(id);
}

/**
 * Get project by aws id from lms.
 *
 * @return {Promise}
 */
export async function getProjectByAWSId(awsId) {
  return LmsProject.getProjectByAWSId(awsId);
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

/**
 * Get all projects from aws.
 *
 * @return {Promise}
 */
export async function getAwsInstance(projectDetails, instanceName) {
  let result = [];
  let instances = '';
  let params = {
    Filters: [{
      Name: "tag:Project",
      Values: [instanceName]
    }]
  }
  try {
    let vaultData = await vaultUtils.getAWSKeys();
    awsUtils.updateKey(projectDetails.awsId,vaultData.data);
    if (!instanceName) { instances = awsUtils.describeInstancesWithoutFilter(params); }
    else
      instances = awsUtils.describeInstances(params);

    let projectInformations = await instances.promise();
    projectInformations.Reservations.forEach(reservation => { result.push(getProjectDetails(reservation)); });

    return result;
  } catch (err) { throw (err) }
}

/**
 * Get aws instnace by id
 * 
 * @param {String} instanceId 
 */
export async function getAwsInstanceByInstanceId(instanceId) {
  let result = [];
  let instances = '';
  let params = { InstanceIds: [instanceId] }
  try {
    instances = awsUtils.describeInstances(params);
    let projectInformations = await instances.promise();
    projectInformations.Reservations.forEach(reservation => { result.push(getProjectDetails(reservation)); });

    return result[0];
  } catch (err) { throw (err) }
}

/**
 * Get project details
 * 
 * @param {Array} reservation 
 */
function getProjectDetails(reservation) {
  let result = [];
  let project = '';
  let platform = '';
  let osPlatform = '';
  reservation.Instances.forEach(instance => {
    for (let tag of instance.Tags) {
      if (tag.Key === CONSTANTS.PROJECT) {
        project = tag.Value;

        break;
      }
      if (tag.Key === CONSTANTS.OS_PLATFORM) {
        platform = tag.Value;

        break;
      }
    }

    if (platform && platform.toLowerCase().indexOf(CONSTANTS.WINDOWS) != -1) { osPlatform = CONSTANTS.WINDOWS }
    else { osPlatform = CONSTANTS.LINUX }

    result.push({
      project: project,
      platform: osPlatform,
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
export async function getRdsInstanceByAWSId(awsId) {
  try {
    let vaultData = await vaultUtils.getAWSKeys();
    awsUtils.updateKey(awsId,vaultData.data);
    let result = [];
    let instances = awsUtils.describeDBInstances();
    let response = await instances.promise();

    response.DBInstances.forEach(database => {
      result.push({
        Engine: database.Engine,
        DBName: database.DBName,
        MultiAZ: database.DBInstanceClass,
        DbiResourceId: database.DbiResourceId,
        DBInstanceClass: database.DBInstanceClass,
        AllocatedStorage: database.AllocatedStorage,
        DBInstanceIdentifier: database.DBInstanceIdentifier
      });
    });

    return result;
  }
  catch (err) { throw (err) }
}

/**
 * Get rds by instance identifier
 * 
 * @param {String} dbInstanceIdentifier 
 */
export async function getRdsByDBInstanceIdentifier(dbInstanceIdentifier) {
  try {
    let result = [];
    let params = { DBInstanceIdentifier: dbInstanceIdentifier };
    let instances = awsUtils.describeDBInstances(params);
    let response = await instances.promise();
console.log("response",response);
    response.DBInstances.forEach(database => {
      result.push({
        Engine: database.Engine,
        DBName: database.DBName,
        MultiAZ: database.DBInstanceClass,
        DbiResourceId: database.DbiResourceId,
        DBInstanceClass: database.DBInstanceClass,
        AllocatedStorage: database.AllocatedStorage,
        DBInstanceIdentifier: database.DBInstanceIdentifier
      });
    });

    return result[0];
  }
  catch (err) { throw (err) }
}

/**
 * Fetch information from rds database
 */
export async function getRdsInstances() {
  try {
    let result = [];
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
export async function listBucketNames(awsId) {
  try {
    let vaultData = await vaultUtils.getAWSKeys();
    awsUtils.updateKey(awsId,vaultData.data);

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
export async function getBucketByBucketName(awsId, bucketName) {
  try {
    let vaultData = await vaultUtils.getAWSKeys();
    awsUtils.updateKey(awsId,vaultData.data);

    let params = { Bucket: bucketName };
    let bucketObject = awsUtils.listObjectsV2(params);
    let response = await bucketObject.promise();

    return response;
  }
  catch (err) { throw (err) }
}

/**
 * Fetch billing details
 */
export async function getEc2Pricing(priceInfo, instances) {
  try {

    return priceInfo;
  }
  catch (err) { throw (err) }
}

/**
 * Get volume
 * 
 * @param {String} instancesId 
 */
export async function getVolume(instancesId) {
  try {
    let result = '';
    let params = {
      Filters: [{
        Name: "attachment.instance-id",
        Values: [instancesId]
      }]
    }
    let volumes = awsUtils.describeVolumes(params);
    let response = await volumes.promise();
    response.Volumes.forEach(volume => { result = volume.Size });

    return result;
  }
  catch (err) { throw (err) }
}

/**
 * Calculate billing detail
 * @param {String} volumeSize 
 * @param {Object} priceInfo 
 * @param {Object} instanceInfo 
 */
export async function calculateBillingDetail(volumeSize, priceInfo, instanceInfo) {
  try {
    let result = '';
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthIndex = new Date().getMonth();
    let instanceRate = priceInfo[instanceInfo.instanceType];
    result = (instanceRate * 24 * months[monthIndex]) + (volumeSize * (0.1 / 30) * months[monthIndex]);

    return result;
  }
  catch (err) { throw (err) }
}

/**
 * Calculate rds billing detail
 * 
 * @param {Object} priceInfo 
 * @param {Object} instanceInfo 
 */
export async function calculateRDSBillingDetail(priceInfo, instanceInfo) {
  try {
    let result = '';
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthIndex = new Date().getMonth();
    let instanceRate = priceInfo[instanceInfo.DBInstanceClass];
    result = (instanceRate * 24 * months[monthIndex]) + (instanceInfo.AllocatedStorage * (0.115 / 30) * months[monthIndex]);

    return result;
  }
  catch (err) { throw (err) }
}

/**
 * Calculate s3 billing
 * 
 * @param {Object} bucketInfo 
 */
export async function calculateS3Billing(bucketInfo) {
  try {
    return result;
  }
  catch (err) { throw (err) }
}
