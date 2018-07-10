import * as httpUtil from '../utils/httpUtil';

const LMS_ALL_PROJECT_URL = 'http://lms.lftechnology.com/api/projectlist';

export function fetchLMSAllProject() {
    return httpUtil.get(LMS_ALL_PROJECT_URL);
}
