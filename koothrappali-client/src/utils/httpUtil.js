import axios from 'axios';

export function get(url, headers) {
  try {
    return axios({
      method: 'GET',
      url: url
    });
  }
  catch (error) { error }
}
