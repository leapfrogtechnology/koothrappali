import _ from 'lodash';
import AWS from 'aws-sdk';
import CONFIG from '../const';

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_SECRET,
  region: process.env.REGION
});

const { PROJECT } = CONFIG;
class AwsService {
  /**
   * Fetch reservations from aws
   */
  getAllReservations() {
    return new Promise((resolve, reject) => {
      let request = new AWS.EC2({ apiVersion: '2018-10-01' }).describeInstances();

      request
        .on('success', function (response) {
          return resolve(response.data.Reservations);
        })
        .send();
    });
  }

  /**
   * Fetch project details
   * 
   * @param {array} reservations 
   */
  getProjectInfo(reservations) {
    let project = '';
    let response = [];
    reservations.forEach(reservation => {
      reservation.Instances[0].Tags.forEach(tag => {
        if (tag.Key === PROJECT) {
          project = tag.Value;
        }
      });
      response.push({
        project: project,
        state: reservation.Instances[0].State,
        imageId: reservation.Instances[0].ImageId,
        instanceId: reservation.Instances[0].InstanceId,
        instanceType: reservation.Instances[0].InstanceType,
        publicIpAddress: reservation.Instances[0].PublicIpAddress
      });
    });

    return response;
  }

  /**
   * Group by instances
   * 
   * @param {Array} instances 
   */
  groupInstances(instances) {
    let result = _(instances)
      .groupBy(x => x.project)
      .map((value, key) => ({ project: key, instances: value }))
      .value();

    return result;
  }

  getallS3BucketNames() {
    return new Promise((resolve, reject) => {
      let bucketName = [];
      let s3 = new AWS.S3({ apiVersion: '2018-10-01' });

      // Call S3 to list current buckets
      s3.listBuckets().promise()
        .then((response) => {
          bucketName = response.Buckets.map(a => a.Name);

          return resolve(bucketName)
        })
        .catch(err => reject(err));
    });
  }

  getS3BucketObjects(bucketName) {
    return new Promise((resolve, reject) => {
      let s3 = new AWS.S3({ apiVersion: '2018-10-01' });
      let params = {
        Bucket: bucketName,
      };

      // List objects in a bucket
      s3.listObjectsV2(params).promise()
        .then((response) => {

          return resolve(response)
        })
        .catch(err => reject(err));
    });
  }
}

export default AwsService;
