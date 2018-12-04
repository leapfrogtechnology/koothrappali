import { flatMap } from 'lodash';

import logger from '../utils/logger';
import { assignUsingTags } from '../utils/tags';
import { fetchAllAWSLocation } from '../utils/aws';
import { fetchAll, fetchTags } from '../utils/s3';

const INSTANCE_TYPE = 's3';

/**
 * Fetch all buckets from all regions.
 *
 * @returns {Promise<Array>}
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
 * @returns {Promise<Array>}
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
 * @returns {Promise<Object>}
 */
async function fetchTagsFor(region, bucket) {
  let tags = [];

  try {
    tags = await fetchTags(region, bucket);
  } catch (error) {
    logger.error(`Could not fetch tags for ${bucket.Name}`, error);
  }

  return {
    ...assignUsingTags(tags),
    location: region,
    type: INSTANCE_TYPE
  };
}
