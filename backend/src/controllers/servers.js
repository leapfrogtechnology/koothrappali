import { fetchAllServers } from '../services/serverService';

/**
 * Get all servers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllServers();

  res.json({ data });
}
