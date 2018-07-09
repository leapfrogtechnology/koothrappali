import Boom from 'boom';
import axios from 'axios';
import CONFIG from '../const';

const { LMS_API_KEY } = CONFIG;
/**
 * Get all users.
 *
 * @return {Promise}
 */
export async function getAllProjects({ token }) {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'http://lms.lftechnology.com/api/projectlist',
      params: { token },
      headers: {
        apiKey: LMS_API_KEY
      },
      data: {}
    });

    return data;
  } catch (err) {
    if (err.response.status === 401) {
      throw Boom.unauthorized();
    }
    throw Boom.badRequest();
  }
}
