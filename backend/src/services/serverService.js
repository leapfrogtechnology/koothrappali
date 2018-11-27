import * as aws from '../aws';

import { flatMap } from 'lodash';

/**
 * Async function to get all servers from all regions.
 */
export async function fetchAllServers() {
  const promises = Object.keys(aws.default.ec2).map(key => fetchAllServersOfRegion(key));
  const results = await Promise.all(promises);
  const servers = flatMap(results, result => result);

  return servers;
}

/**
 * Get servers from particular region name.
 *
 * @param {String} regionName
 */
export function fetchAllServersOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.ec2[regionName].describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      }
      let instances = data.Reservations.map(reservation => {
        return reservation.Instances.map(instance => {
          instance.type = 'ec2';
          instance.project = 'NoProject';
          instance.Tags.map(tag => {
            const value = tag.Value;

            switch (tag.Key) {
              case 'Project':
                instance.project = value;
                break;
              case 'Deployment':
                instance.environment = tag.Value;
                break;
              case 'OS Platform':
                instance.os = tag.Value;
                break;
              case 'Name':
                instance.name = tag.Value;
                break;
              case 'Services':
                instance.services = tag.Value;
                break;
            }
          });

          return instance;
        });
      });

      const response = flatMap(instances, result => result);

      resolve(response);
    });
  });
}
