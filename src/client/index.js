import axios from 'axios';
import {api_url} from '../constants/api';

export function HandShakeWithApi() {
  axios.get(`${api_url}/`).then((response) => {
    console.log(response.data['message'] === 'OK'
        ? 'Connected'
        : 'Unable to connect to the api');
  }).catch((error) => {
    console.warn('Unable to get API response', error);
  });
}
