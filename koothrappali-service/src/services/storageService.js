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
   * Get bucket names
   */
  getallS3BucketNames() {
    return new Promise((resolve, reject) => {
      let bucketName = [];
      let s3 = new AWS.S3({ apiVersion: '2018-10-01' });

      s3.listBuckets().promise()
        .then((response) => {
          bucketName = response.Buckets.map(a => a.Name);

          return resolve(bucketName)
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Get bucket object
   * 
   * @param {Object} bucketName 
   */
  getS3BucketObjects(bucketName) {
    return new Promise((resolve, reject) => {
      let s3 = new AWS.S3({ apiVersion: '2018-10-01' });
      let params = {
        Bucket: bucketName,
      };

      s3.listObjectsV2(params).promise()
        .then((response) => {
          return resolve(response)
        })
        .catch(err => reject(err));
    });
  }
}

export default StorageService;
