import { getS3Instance } from './aws';

/**
 * Fetch all S3 buckets.
 *
 * @returns {Promise}
 */
export async function fetchAll() {
  const s3 = getS3Instance();
  const data = await s3.listBuckets().promise();

  return data.Buckets;
}

/**
 * Fetch all tags of S3 bucket.
 *
 * @param {Object} instance
 * @returns {Promise}
 */
export async function fetchTags(instance) {
  const s3 = getS3Instance();
  const params = {
    Bucket: instance.Name
  };
  const data = await s3.getBucketTagging(params).promise();
  const tags = data.TagSet ? data.TagSet : [];

  return tags;
}
