import AWS from 'aws-sdk';
import { Router } from 'express';

let router = Router();

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: 'AKIAJRBY24NPM7G5PJGQ',
  secretAccessKey: '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',
  region: 'us-east-1'
});

/**
 * Contains all config for the application.
 */
router.get('/config', (request, response) => {
  response.json({
    data: AWS.config
  });
});

/**
 * GET /instances
 */
router.get('/instances', (req, res) => {
  //   let instance;
  let projectsInfo = [];
  let request = new AWS.EC2({ apiVersion: '2018-10-01' }).describeInstances();
  request
    .on('success', function(response) {
      for (let item in response.data.Reservations) {
        let instances = response.data.Reservations[item].Instances;
        for (let instance in instances) {
          let tags = instances[instance].Tags;
          for (let i in tags) {
            if (tags[i].Key === 'Project') {
              projectsInfo.push(tags[i]);
            }
          }
        }
      }

      return res.json({
        data: projectsInfo
      });
    })
    .send();
});

export default router;
