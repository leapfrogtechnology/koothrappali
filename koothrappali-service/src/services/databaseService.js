
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
      let rds = new AWS.RDS();
      let params = {
        DBInstanceIdentifier: 'mux-mud-psq-pt-002',
      };

      rds.describeDBInstances(params).promise()
        .then((response) => {
          return resolve(response.DBInstances)
        })
        .catch(err => reject(err));
    });
  }
}

export default StorageService;
