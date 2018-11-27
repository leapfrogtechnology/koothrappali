import * as instanceService from '../services/instanceService';
import * as responseService from '../services/responseService';

/**
 * Get all Instances.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await instanceService.fetchAllInstances();
  res.json({ data: responseService.groupByProjectAndEnvironment(data.projects, data.instances) });
}
