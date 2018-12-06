import { getRDSInstanceFor } from './aws';

/**
 * Fetch all RDS from region.
 *
 * @param {String} region
 * @returns {Promise}
 */
export async function fetchAll(region) {
  const rds = getRDSInstanceFor(region);
  const data = await rds.describeDBInstances().promise();

  return data.DBInstances;
}

/**
 * Fetch all tags of RDS instance.
 *
 * @param {String} region
 * @param {Object} instance
 * @returns {Promise}
 */
export async function fetchTags(region, instance) {
  const rds = getRDSInstanceFor(region);
  const params = {
    ResourceName: instance.DBInstanceArn
  };
  const data = await rds.listTagsForResource(params).promise();
  const tags = data.TagList ? data.TagList : [];

  return tags;
}
