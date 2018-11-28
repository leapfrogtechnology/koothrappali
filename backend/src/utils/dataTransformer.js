import { groupBy } from 'lodash';

/**
 * This method groups the instances according to environment and projects
 * @param {Array} instances
 *
 * @returns {Array}
 */
export function groupByProjectAndEnvironment(instances) {
  const instanceGroupedByProjects = groupBy(instances, instance => instance.project);
  const response = Object.keys(instanceGroupedByProjects).map(key => {
    const instanceGroupedByEnvironments = groupBy(instanceGroupedByProjects[key], ins => ins.environment);
    const environments = Object.keys(instanceGroupedByEnvironments).map(key => ({
      title: key,
      servers: instanceGroupedByEnvironments[key]
    }));

    return {
      project: key,
      environments: environments
    };
  });

  return response;
}
