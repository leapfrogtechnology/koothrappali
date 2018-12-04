import { flatMap } from 'lodash';

import { assignUsingTags } from '../utils/tags';
import { fetchAllAWSLocation } from '../utils/aws';
import { fetchAll, fetchTags } from '../utils/s3';

const INSTANCE_TYPE = 's3';

/**
 * Async function to Fetch all buckets from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllBuckets() {
  const regions = await fetchAllAWSLocation();
  const promises = regions.map(region => fetchAllBucketsOfRegion(region));
  const results = await Promise.all(promises);
  const buckets = flatMap(results, result => result);

  return buckets;
}

/**
 * Fetch buckets from particular region name.
 *
 * @param {String} region
 * @returns {Promise}
 */
export async function fetchAllBucketsOfRegion(region) {
  const s3 = await fetchAll(region);
  const s3WithTags = s3.map(bucket => fetchTagsFor(region, bucket));
  const response = await Promise.all(s3WithTags);

  return response;
}

/**
 * This function fetches tags for the S3.
 *
 * @param {String} region
 * @param {Object} bucket
 * @returns {Promise}
 */
async function fetchTagsFor(region, bucket) {
  const tags = await fetchTags(region, bucket);
  const instance = assignUsingTags(tags);

  instance.location = region;
  instance.type = INSTANCE_TYPE;

  return instance;
}
