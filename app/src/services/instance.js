import config from '../config';
import * as http from '../utils/http';

/**
 * Fetch all instances
 *
 * @returns {Promise}
 */
export function fetchAll() {
  return http.default.get(config.api.instances);
}
