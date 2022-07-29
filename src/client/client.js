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

export async function GetAllRooms() {
  try {
    const rooms = await axios.get(`${api_url}/room/get/all`);
    return await rooms.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ConnectToRoom(RoomId) {
  try {
    const json = JSON.stringify(
        {'id': 0, 'nickname': 'kxrxh', 'room_id': 0, 'team': 0});
    const response = await axios.post(`${api_url}/user/connect/${RoomId}`,
        json);
    return await response.data;
  } catch (e) {
    console.log(e);
  }
}

