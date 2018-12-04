import { fetchAllDatabases } from '../services/databaseService';

/**
 * Get all databases.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllDatabases();

  res.json({ data });
}
