import { fetchAllServers } from '../services/serverService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all servers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @returns {JSON}
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllServers();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
