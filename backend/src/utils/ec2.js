import { getEC2InstanceFor } from './aws';

/**
 * Fetch all ec2 from region.
 *
 * @param {String} region
 * @returns {Promise}
 */
export async function fetchAll(region) {
  const ec2 = getEC2InstanceFor(region);
  const data = await ec2.describeInstances().promise();
  const instances = data.Reservations;

  return instances;
}
