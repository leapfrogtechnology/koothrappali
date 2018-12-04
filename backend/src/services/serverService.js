import { flatMap } from 'lodash';

import { fetchAll } from '../utils/ec2';
import { assignUsingTags } from '../utils/tags';
import { fetchAllAWSLocation } from '../utils/aws';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

const INSTANCE_TYPE = 'ec2';

/**
 * Async function to get all servers from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllServers() {
  const regions = await fetchAllAWSLocation();
  const promises = regions.map(region => fetchAllServersOfRegion(region));
  const results = await Promise.all(promises);
  const servers = flatMap(results, result => result);

  return groupByProjectAndEnvironment(servers);
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
      const server = assignUsingTags(instance.Tags);

      server.location = region;
      server.domain = instance.PublicDnsName;
      server.type = INSTANCE_TYPE;
      server.ip = instance.PublicIpAddress;
      server.state = instance.State ? instance.State.Name : '-';

      return server;
    });
  });

  const response = flatMap(instances, result => result);

  return response;
}
