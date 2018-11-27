import * as serverService from '../services/serverService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all servers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await serverService.fetchAllServers();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
