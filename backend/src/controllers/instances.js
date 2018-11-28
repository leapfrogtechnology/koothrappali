import { fetchAllInstances } from '../services/instanceService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all Instances.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @returns {JSON}
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllInstances();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
