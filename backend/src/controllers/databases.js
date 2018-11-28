import { fetchAllDatabases } from '../services/databaseService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all databases.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @returns {JSON}
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllDatabases();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
