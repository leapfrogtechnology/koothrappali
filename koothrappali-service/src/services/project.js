import Project from '../model/project';

/**
 * Get all proojects from lms.
 *
 * @return {Promise}
 */
export async function getAllProjects() {
  return Project.getAllProjects();
}
