
import _ from 'lodash';
import AWS from 'aws-sdk';

AWS.config.logger = console;
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_SECRET,
  region: process.env.REGION
});

class StorageService {
  /**
 * Get db instances
 */
  getDatabaseInstances() {
    return new Promise((resolve, reject) => {
      let dbInstances = '';
      let result = [];
      let rds = new AWS.RDS();
      let params = {
        DBInstanceIdentifier: 'mux-mud-psq-pt-002',
      };

      rds.describeDBInstances(params).promise()
        .then((response) => {
          dbInstances = response.DBInstances[0];
        })
        .then(() => {
          let params = {
            ResourceName: 'arn:aws:rds:us-east-1:009409476372:db:mux-mud-psq-pt-002', 
          };
          return rds.listTagsForResource(params).promise()
            .then((resources) => {
              let tag = resources.TagList[0];

              result.push({
                Project: tag.Value,
                DBInstanceClass: dbInstances.DBInstanceClass,
                AllocatedStorage: dbInstances.AllocatedStorage,
                MultiAZ: dbInstances.DBInstanceClass
              });
              return resolve(result[0]);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}

export default StorageService;
