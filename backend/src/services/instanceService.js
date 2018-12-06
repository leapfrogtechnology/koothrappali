import { fetchAllServers } from '../services/serverService';
import { fetchAllBuckets } from '../services/bucketService';
import { fetchAllDatabases } from '../services/databaseService';

/**
 * Fetch all Instances.
 *
 * @return {Promise<Array>}
 */
export async function fetchAllInstances() {
  const [servers, databases, buckets] = await Promise.all([fetchAllServers(), fetchAllBuckets(), fetchAllDatabases()]);

  return [...servers, ...buckets, ...databases];
}
