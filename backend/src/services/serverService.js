import { flatMap } from 'lodash';

import config from '../config';
import { assignUsingTags } from '../utils/tags';
import { fetchAllEC2Locations } from '../utils/aws';

/**
 * Async function to get all servers from all regions.
 *
 * @returns {Promise}
 */
export async function fetchAllServers() {
  const ec2Locations = await fetchAllEC2Locations();
  const promises = ec2Locations.map(ec2Location => fetchAllServersOfRegion(ec2Location));
  const results = await Promise.all(promises);
  const servers = flatMap(results, result => result);

  return servers;
}

/**
 * Get servers from particular region name.
 *
 * @param {Object} ec2Location
 * @returns {Promise}
 */
export function fetchAllServersOfRegion(ec2Location) {
  return new Promise((resolve, reject) => {
    ec2Location.describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      }
      const instances = data.Reservations.map(reservation => {
        return reservation.Instances.map(instance => {
          const server = assignUsingTags(instance.Tags);
          server.location = ec2Location.config.region;
          server.domain = instance.PublicDnsName;
          server.type = config.instanceTypes.ec2;
          server.ip = instance.PublicIpAddress;
          server.state = instance.State ? instance.State.Name : '-';

          return server;
        });
      });

      const response = flatMap(instances, result => result);

      resolve(response);
    });
  });
}
