import { flatMap } from 'lodash';

import { fetchAll } from '../utils/ec2';
import { assignUsingTags } from '../utils/tags';
import { fetchAllAWSLocation } from '../utils/aws';

const INSTANCE_TYPE = 'ec2';

/**
 * Get all servers from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllServers() {
  const regions = await fetchAllAWSLocation();
  const promises = regions.map(region => fetchAllServersOfRegion(region));
  const results = await Promise.all(promises);
  const servers = flatMap(results, result => result);

  return servers;
}

/**
 * Get servers from particular region name.
 *
 * @param {Object} region
 * @returns {Promise}
 */
async function fetchAllServersOfRegion(region) {
  const ec2 = await fetchAll(region);
  const instances = ec2.map(reservation => {
    return reservation.Instances.map(instance => {
      return {
        ...assignUsingTags(instance.Tags),
        location: region,
        domain: instance.PublicDnsName,
        ip: instance.PublicIpAddress,
        state: instance.State ? instance.State.Name : '-',
        type: INSTANCE_TYPE
      };
    });
  });

  const response = flatMap(instances, result => result);

  return response;
}
