import { getEC2InstanceFor } from './aws';

/**
 * Fetch all ec2 from region.
 *
 * @param {String} region
 * @returns {Promise}
 */
export function fetchAll(region) {
  return new Promise((resolve, reject) => {
    const ec2 = getEC2InstanceFor(region);

    ec2.describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      }

      const instances = data.Reservations;

      resolve(instances);
    });
  });
}
