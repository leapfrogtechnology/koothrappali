import { flatMap } from 'lodash';

import logger from '../utils/logger';
import { assignUsingTags } from '../utils/tags';
import { fetchAll, fetchTags } from '../utils/s3';

const INSTANCE_TYPE = 's3';

/**
 * Fetch all buckets from all regions.
 *
 * @returns {Promise<Array>}
 */
export async function fetchAllBuckets() {
  const s3 = await fetchAll();
  const s3WithTags = s3.map(bucket => fetchTagsFor(bucket));
  const buckets = await Promise.all(s3WithTags);

  return buckets;
}

/**
 * This function fetches tags for the S3.
 *
 * @param {Object} bucket
 * @returns {Promise<Object>}
 */
async function fetchTagsFor(bucket) {
  let tags = [];

  try {
    tags = await fetchTags(bucket);
  } catch (error) {
    logger.error(`Could not fetch tags for ${bucket.Name}`, error);
  }

  return {
    ...assignUsingTags(tags),
    type: INSTANCE_TYPE
  };
}
