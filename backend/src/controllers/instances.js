import { fetchAllInstances } from '../services/instanceService';

/**
 * Get all instances.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllInstances();

  res.json({ data });
}
