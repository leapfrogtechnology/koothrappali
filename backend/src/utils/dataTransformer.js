import { groupBy } from 'lodash';

/**
 * This method groups the instances according to environment and projects
 * @param {Array} projects
 * @param {Array} instances
 */
export function groupByProjectAndEnvironment(instances) {
  const instanceGroupedByProjects = groupBy(instances, instance => instance.project);
  const response = Object.keys(instanceGroupedByProjects).map(key => {
    const instanceGroupedByEnvironments = groupBy(instanceGroupedByProjects[key], ins => ins.environment);
    const environments = Object.keys(instanceGroupedByEnvironments).map(key => ({
      title: key,
      servers: instanceGroupedByEnvironments[key].map(server => ({
        name: server.name,
        type: server.type,
        environment: server.environment ? server.environment : '-',
        ip: server.PublicIpAddress ? server.PublicIpAddress : '-',
        os: server.os ? server.os : '-',
        account: 'aws@leapfrog',
        location: server.Placement
          ? server.Placement.AvailabilityZone
          : server.AvailabilityZone
            ? server.AvailabilityZone
            : '-',
        status: server.State ? server.State.Name : server.DBservertanceStatus ? server.DBservertanceStatus : '-',
        domain: server.PublicDnsName ? server.PublicDnsName : '-',
        services: server.services
          ? server.services.split('|').length
            ? server.services.split('|')
            : server.services.split('/')
          : []
      }))
    }));

    return {
      project: key,
      environments: environments
    };
  });

  return response;
}
