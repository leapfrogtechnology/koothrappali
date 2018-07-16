// import Boom from 'Boom';
import axios from 'axios';
import CONFIG from '../constants';

const { LMS_API_KEY, LMS } = CONFIG;

class Project {
  /**
  * Fetch all projects detail from lms.
  */
  static async getAllProjects() {
    try {
      const result = await axios({
        method: 'get',
        url: `${LMS.BASE_URL + LMS.PROJECT_LIST}`,
        headers: {
          apiKey: LMS_API_KEY
        },
        result: {}
      });

      return result.data;
    }
    catch (err) { throw (err) }
  }

/**
* Fetch projects detail by Id from lms.
*/
  static async  getProjectById(id) {
    try {
      if (!id) {
        throw new Error("Id not found");
      }

      const result = await axios({
        method: 'get',
        url: `${LMS.BASE_URL + LMS.PROJECT}/${id}`,
        headers: {
          apiKey: LMS_API_KEY
        },
        result: {}
      });

      return result.data;
    }
    catch (err) { throw (err) }
  }
}
export default Project;
