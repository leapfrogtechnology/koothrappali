import * as serverService from '../services/serverService';
import * as responseService from '../services/responseService';

/**
 * Get all servers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await serverService.fetchAllServers();
  res.success(responseService.groupByProjectAndEnvironment(data.projects, data.instances));
}
