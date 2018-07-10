import axios from 'axios';

export function get(url, headers) {
  try {
    return axios({
      method: 'GET',
      url: url,
      headers: { apiKey: 'KwFCd240ziWFHM-FvpCT6xx34NY9C3o3gtvaSEuh' }
    });

  }
  catch (error) { console.log("error>>>>>>>>>>", error) }
}
