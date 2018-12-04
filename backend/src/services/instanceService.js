import { fetchAllServers } from '../services/serverService';
import { fetchAllBuckets } from '../services/bucketService';
import { fetchAllDatabases } from '../services/databaseService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';
/**
 * Fetch all Instances.
 *
 * @return {Array}
 */
export async function fetchAllInstances() {
  const instances = [];
  const [servers, databases, buckets] = await Promise.all([fetchAllServers(), fetchAllBuckets(), fetchAllDatabases()]);

  instances.push(...servers, ...buckets, ...databases);

  return groupByProjectAndEnvironment(instances);
}
