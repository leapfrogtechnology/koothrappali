import { fetchAllBuckets } from '../services/bucketService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all buckets.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @returns {JSON}
 */
export async function fetchAll(req, res, next) {
  const data = await fetchAllBuckets();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
