import * as serverService from '../services/serverService';
import * as databaseService from '../services/databaseService';
import * as bucketService from '../services/bucketService';

/**
 * Fetch all Instances.
 *
 * @return {Array}
 */
export async function fetchAllInstances() {
  const instances = [];
  const [servers, databases, buckets] = await Promise.all([
    serverService.fetchAllServers(),
    databaseService.fetchAllDatabases(),
    bucketService.fetchAllBuckets()
  ]);

  instances.push(...servers, ...databases, ...buckets);

  return instances;
}
