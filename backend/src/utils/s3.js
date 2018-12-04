import { getS3InstanceFor } from './aws';

/**
 * Fetch all S3 from region.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function fetchAll(region) {
  return new Promise((resolve, reject) => {
    const s3 = getS3InstanceFor(region);

    s3.listBuckets({}, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.Buckets);
    });
  });
}

/**
 * Fetch all tags of s3 bucket.
 *
 * @param {String} region
 * @param {Object} instance
 * @returns {Promise}
 */
export function fetchTags(region, instance) {
  return new Promise((resolve, reject) => {
    const s3 = getS3InstanceFor(region);
    const params = {
      Bucket: instance.Name
    };

    s3.getBucketTagging(params, (err, data) => {
      if (err) {
        reject(err);
      }

      const tags = data.TagSet ? data.TagSet : [];

      resolve(tags);
    });
  });
}
