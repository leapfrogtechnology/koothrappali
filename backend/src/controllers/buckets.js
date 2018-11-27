import * as bucketService from '../services/bucketService';
import { groupByProjectAndEnvironment } from '../utils/dataTransformer';

/**
 * Get all buckets.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await bucketService.fetchAllBuckets();

  res.json({ data: groupByProjectAndEnvironment(data) });
}
