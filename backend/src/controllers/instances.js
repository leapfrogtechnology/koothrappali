import * as instanceService from '../services/instanceService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all Instances.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await instanceService.fetchAllInstances();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
