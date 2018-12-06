import { getS3InstanceFor } from './aws';

/**
 * Fetch all S3 buckets from region.
 *
 * @param {String} region
 * @returns {Promise}
 */
export async function fetchAll(region) {
  const s3 = getS3InstanceFor(region);
  const data = await s3.listBuckets().promise();

  return data.Buckets;
}

/**
 * Fetch all tags of S3 bucket.
 *
 * @param {String} region
 * @param {Object} instance
 * @returns {Promise}
 */
export async function fetchTags(region, instance) {
  const s3 = getS3InstanceFor(region);
  const params = {
    Bucket: instance.Name
  };
  const data = await s3.getBucketTagging(params).promise();
  const tags = data.TagSet ? data.TagSet : [];

  return tags;
}
