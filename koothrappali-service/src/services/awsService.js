import _ from 'lodash';
import axios from 'axios';
import AWS from 'aws-sdk';
import CONFIG from '../constants';

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
}
export default AwsService;
