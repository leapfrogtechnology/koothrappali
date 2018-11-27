import * as bucketService from '../services/bucketService';
import * as responseService from '../services/responseService';

/**
 * Get all buckets.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const data = await bucketService.fetchAllBuckets();
  res.json({ data: responseService.groupByProjectAndEnvironment(data.projects, data.instances) });
}
