// import Boom from 'Boom';
import axios from 'axios';
import CONFIG from '../constants';

const { LMS_API_KEY } = CONFIG;

class Project {
  /**
  * Fetch all Project from lms.
  */
  static async getAllProjects() {
    try {
      const result = await axios({
        method: 'get',
        url: 'http://lms.lftechnology.com/api/projectlist',
        headers: {
          apiKey: LMS_API_KEY
        },
        result: {}
      });

      console.log(result.data);
      return result.data;
    } catch (err) {
      // if (err.response.status === 401) {
      //   throw Boom.unauthorized();
      // }
      // throw Boom.badRequest();
      console.log(err);
    }
  }
}
export default Project;
