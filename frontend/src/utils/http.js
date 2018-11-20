import * as axios from 'axios'

/**
 * GET function to fetch API using Axios
 * @param {string} url
 */
export function get(url) {
  return axios.get(url).then(response => response.json());
}
