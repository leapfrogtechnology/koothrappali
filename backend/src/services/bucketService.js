import { flatMap } from 'lodash';

import { assignUsingTags } from '../utils/tags';
import { fetchAllS3Locations } from '../utils/aws';

const instanceType = 's3';

/**
 * Async function to Fetch all buckets from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllBuckets() {
  const s3Locations = await fetchAllS3Locations();
  const promises = s3Locations.map(s3Location => fetchAllBucketsOfRegion(s3Location));
  const results = await Promise.all(promises);
  const buckets = flatMap(results, result => result);

  return buckets;
}

/**
 * Fetch buckets from particular region name.
 *
 * @param {Object} s3Location
 *
 * @returns {Promise}
 */
export function fetchAllBucketsOfRegion(s3Location) {
  return new Promise((resolve, reject) => {
    s3Location.listBuckets({}, async (err, data) => {
      if (err) {
        reject(err);
      }

      const bucketsWithTags = data.Buckets.map(bucket => fetchTagsForBucket(s3Location, bucket));
      const response = await Promise.all(bucketsWithTags);

      resolve(response);
    });
  });
}

/**
 * This function fetches tags for the buckets.
 *
 * @param {Object} s3
 * @param {Object} bucket
 *
 * @returns {Promise}
 */
function fetchTagsForBucket(s3, bucket) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket.Name
    };
    s3.getBucketTagging(params, (err, data) => {
      if (err) {
        reject(err);
      }

      const bucket = assignUsingTags(data.TagSet);

      bucket.location = s3.config.region;
      bucket.type = instanceType;

      resolve(bucket);
    });
  });
}
