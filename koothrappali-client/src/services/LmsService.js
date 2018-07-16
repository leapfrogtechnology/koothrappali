import * as httpUtil from '../utils/httpUtil';

const LMS_ALL_PROJECT_URL = 'http://localhost:8848/api/projects/lms';

export function fetchLMSAllProject() {
    return httpUtil.get(LMS_ALL_PROJECT_URL);
}
