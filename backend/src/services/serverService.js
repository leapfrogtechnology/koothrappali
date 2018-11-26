import * as aws from '../aws';

/**
 * Async function to get all servers from all regions
 */
export async function fetchAllServers() {
  let servers = {
    projects: [],
    instances: []
  };
  await Promise.all(
    Object.keys(aws.default.ec2).map(async key => {
      await fetchAllServersOfRegion(key).then(data => {
        servers.projects.push(...data.projects);
        servers.instances.push(...data.instances);
      });
    })
  );

  return servers;
}

/**
 * Get servers from particular region name
 * @param {String} regionName
 */
export function fetchAllServersOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.ec2[regionName].describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      }
      let instances = [];
      let projects = [];
      data.Reservations.map(reservation => {
        reservation.Instances.map(instance => {
          instance.Tags.map(tag => {
            if (tag.Key === 'Project') {
              instance.project = tag.Value;
              projects.push(tag.Value);
            }
            instance.type = 'ec2';
            if (tag.Key === 'Deployment') {
              instance.environment = tag.Value;
            }
            if (tag.Key === 'OS Platform') {
              instance.os = tag.Value;
            }
            if (tag.Key === 'Name') {
              instance.name = tag.Value;
            }
            if (tag.Key === 'Services') {
              instance.services = tag.Value;
            }
          });
          instances.push(instance);
        });
      });
      const response = { projects: projects, instances: instances };

      return resolve(response);
    });
  });
}
