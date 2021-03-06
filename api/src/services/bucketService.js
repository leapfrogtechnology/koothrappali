import logger from '../utils/logger';
import { assignUsingTags } from '../utils/tags';
import { fetchAll, fetchTags } from '../utils/s3';

const INSTANCE_TYPE = 's3';

/**
 * Fetch all buckets.
 *
 * @returns {Promise<Array>}
 */
export async function fetchAllBuckets() {
  const s3 = await fetchAll();
  const s3WithTags = s3.map(bucket => fetchTagsOfBucket(bucket));
  const buckets = await Promise.all(s3WithTags);

  return buckets;
}

/**
 * Fetch tags for S3 instance.
 *
 * @param {Object} bucket
 * @returns {Promise<Object>}
 */
async function fetchTagsOfBucket(bucket) {
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
