import AWS from 'aws-sdk';

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: 'AKIAJRBY24NPM7G5PJGQ',
  secretAccessKey: '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',
  region: 'us-east-1'
});

class AwsService {
  getAllReservations() {
    return new Promise((resolve, reject) => {
      let projectsInfo = [];
      let request = new AWS.EC2({ apiVersion: '2018-10-01' }).describeInstances();

      request
        .on('success', function(response) {
          return resolve(response.data.Reservations);
        })
        .send();
    });
  }

  getProjectInfo(reservations) {
    return new Promise((resolve, reject) => {
      let instanceDetails = [];
      let instanceInfo = {};

      for (let item in reservations) {
        let instances = reservations[item].Instances;
        for (let i in instances) {
          instanceInfo.imageId = instances[i].ImageId;
          instanceInfo.instanceId = instances[i].InstanceId;
          instanceInfo.instanceType = instances[i].InstanceType;
          instanceInfo.publicIpAddress = instances[i].PublicIpAddress;
          instanceInfo.state = instances[i].State;
          instanceInfo.tags = instances[i].Tags;
        }

        instanceDetails.push(instanceInfo);
      }

      return resolve(instanceDetails);
    });
  }
}

export default AwsService;
