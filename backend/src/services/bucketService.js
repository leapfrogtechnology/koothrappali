import * as aws from '../aws';

import { flatMap } from 'lodash';

/**
 * Async function to Fetch all buckets from all regions.
 */
export async function fetchAllBuckets() {
  const promises = Object.keys(aws.default.s3).map(key => fetchAllBucketsOfRegion(key));
  const results = await Promise.all(promises);
  const buckets = flatMap(results, result => result);

  return buckets;
}

/**
 * Fetch buckets from particular region name.
 *
 * @param {String} regionName
 */
function fetchAllBucketsOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.s3[regionName].listBuckets({}, async (err, data) => {
      if (err) {
        reject(err);
      }

      const bucketsWithTags = data.Buckets.map(bucket => fetchTagsForBucket(regionName, bucket));
      const response = await Promise.all(bucketsWithTags);

      resolve(response);
    });
  });
}

/**
 * This function fetches tags for the buckets.
 *
 * @param {String} regionName
 * @param {Object} bucket
 */
function fetchTagsForBucket(regionName, bucket) {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: bucket.Name
    };
    aws.default.s3[regionName].getBucketTagging(params, (tagErr, tagData) => {
      if (tagErr) {
        reject(tagErr);
      }
      bucket.type = 's3';
      bucket.project = 'NoProject';
      bucket.Tags = tagData ? tagData.TagSet : [];
      bucket.Tags.map(tag => {
        const value = tag.Value;

        switch (tag.Key) {
          case 'Project':
            bucket.project = value;
            break;
          case 'Deployment':
            bucket.environment = value;
            break;
          case 'Name':
            bucket.name = value;
            break;
        }
      });

      resolve(bucket);
    });
  });
}
