import { getRDSInstanceFor } from './aws';

/**
 * Fetch all RDS.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function fetchAll(region) {
  return new Promise((resolve, reject) => {
    const rds = getRDSInstanceFor(region);

    rds.describeDBInstances({}, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.DBInstances);
    });
  });
}

/**
 * Fetch all tags of rds instance.
 *
 * @param {String} region
 * @param {Object} instance
 * @returns {Promise}
 */
export function fetchTags(region, instance) {
  return new Promise((resolve, reject) => {
    const rds = getRDSInstanceFor(region);
    const params = {
      ResourceName: instance.DBInstanceArn
    };

    rds.listTagsForResource(params, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.TagList);
    });
  });
}
