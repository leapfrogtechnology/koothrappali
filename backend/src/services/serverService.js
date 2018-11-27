import * as aws from '../aws';

/**
 * Async function to get all servers from all regions.
 */
export async function fetchAllServers() {
  let servers = {
    projects: [],
    instances: []
  };
  const promises = Object.keys(aws.default.ec2).map(key => fetchAllServersOfRegion(key));
  const results = await Promise.all(promises);
  results.map(data => {
    servers.projects.push(...data.projects);
    servers.instances.push(...data.instances);
  });

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
      const instances = [],
        projects = [];
      data.Reservations.map(reservation => {
        reservation.Instances.map(instance => {
          instance.type = 'ec2';
          instance.Tags.map(tag => {
            const value = tag.Value;
            switch (tag.Key) {
              case 'Project':
                instance.project = value;
                projects.push(tag.Value);
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
          instances.push(instance);
        });
      });
      const response = { projects: projects, instances: instances };

      resolve(response);
    });
  });
}
