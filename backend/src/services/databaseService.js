import { flatMap } from 'lodash';

import config from '../config';
import { assignUsingTags } from '../utils/tags';
import { fetchAllRDSLocations } from '../utils/aws';

/**
 * Async function to get all databases from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllDatabases() {
  const rdsLocations = await fetchAllRDSLocations();
  const promises = rdsLocations.map(rdsLocation => fetchAllDatabasesOfRegion(rdsLocation));
  const results = await Promise.all(promises);
  const databases = flatMap(results, result => result);

  return databases;
}

/**
 * Get databases from particular region name.
 *
 * @param {Object} rdsLocation
 *
 * @returns {Promise}
 */
function fetchAllDatabasesOfRegion(rdsLocation) {
  return new Promise((resolve, reject) => {
    rdsLocation.describeDBInstances({}, async (err, data) => {
      if (err) {
        reject(err);
      }

      const instancesWithTags = data.DBInstances.map(instance => fetchTagsForDatabaseInstance(rdsLocation, instance));
      const response = await Promise.all(instancesWithTags);

      resolve(response);
    });
  });
}

/**
 * This function fetches tags for the database instance.
 *
 * @param {Object} rdsLocation
 * @param {Object} instance
 *
 * @returns {Promise}
 */
function fetchTagsForDatabaseInstance(rdsLocation, instance) {
  return new Promise((resolve, reject) => {
    const params = {
      ResourceName: instance.DBInstanceArn
    };
    rdsLocation.listTagsForResource(params, (err, data) => {
      if (err) {
        reject(err);
      }
      const database = assignUsingTags(data.TagList);
      database.location = rdsLocation.config.region;
      database.domain = instance.Endpoint.Address;
      database.type = config.instanceTypes.rds;

      resolve(database);
    });
  });
}
