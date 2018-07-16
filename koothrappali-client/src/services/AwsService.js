import * as httpUtil from '../utils/httpUtil';

const BASE_URL = 'http://localhost:8848/api/projects';
const INSTANCES = 'instances';

export function fetchProjectById(id) {
    return httpUtil.get(`${BASE_URL}/${id}/${INSTANCES}`);
}
