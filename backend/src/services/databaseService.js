import { flatMap } from 'lodash';

import { assignUsingTags } from '../utils/tags';
import { fetchAllAWSLocation } from '../utils/aws';
import { fetchAll, fetchTags } from '../utils/rds';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

const INSTANCE_TYPE = 'rds';

/**
 * Async function to get all databases from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllDatabases() {
  const regions = await fetchAllAWSLocation();
  const promises = regions.map(region => fetchAllDatabasesOfRegion(region));
  const results = await Promise.all(promises);
  const databases = flatMap(results, result => result);

  return groupByProjectAndEnvironment(databases);
}

/**
 * Get databases from particular region name.
 *
 * @param {String} region
 * @returns {Array<Promise>}
 */
async function fetchAllDatabasesOfRegion(region) {
  const rds = await fetchAll(region);
  const instancesWithTags = rds.map(instance => fetchTagsForDatabaseInstance(region, instance));
  const response = await Promise.all(instancesWithTags);

  return response;
}

/**
 * This function fetches tags for the database instance.
 *
 * @param {String} region
 * @param {Object} instance
 * @returns {Object}
 */
async function fetchTagsForDatabaseInstance(region, instance) {
  const tags = await fetchTags(region, instance);

  return {
    ...assignUsingTags(tags),
    location: region,
    domain: instance.Endpoint.Address,
    type: INSTANCE_TYPE
  };
}
