import * as serverService from '../services/serverService';
import * as databaseService from '../services/databaseService';
import * as bucketService from '../services/bucketService';

/**
 * Fetch all Instances.
 *
 * @return {Array}
 */
export async function fetchAllInstances() {
  let instances = {
    projects: [],
    instances: []
  };
  const [servers, databases, buckets] = await Promise.all([
    serverService.fetchAllServers(),
    databaseService.fetchAllDatabases(),
    bucketService.fetchAllBuckets()
  ]);
  instances.projects.push(...servers.projects);
  instances.instances.push(...servers.instances);
  instances.projects.push(...databases.projects);
  instances.instances.push(...databases.instances);
  instances.projects.push(...buckets.projects);
  instances.instances.push(...buckets.instances);

  return instances;
}
