import * as databaseService from '../services/databaseService';
import * as responseService from '../services/responseService';

/**
 * Get all databases.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await databaseService.fetchAllDatabases();
  res.json({ data: responseService.groupByProjectAndEnvironment(data.projects, data.instances) });
}
