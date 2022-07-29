import axios from 'axios';
import {api_url} from '../constants/api';

export function HandShakeWithApi() {
  axios.get(`${api_url}/`).then((response) => {
    console.log(response.data['message']);
  }).catch((error) => {
    console.warn('Unable to get API response', error);
  });
}

export function GetAllRooms() {
  const fetchData = () => {
    return axios.get(`${api_url}/room/get/all`);
  }
  const getData = async () => {
    return await fetchData()
  }
  return getData();
}