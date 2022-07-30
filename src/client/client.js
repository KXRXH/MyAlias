import axios from 'axios';
import {api_url} from '../constants/api';
import {GetSessionUser, UpdateUser} from '../utils/utils';

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
    const response = await fetch(`${api_url}/room/get/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
}

export async function ConnectToRoom(User, RoomId) {
  try {
    const response = await fetch(`${api_url}/user/connect/${RoomId}`, {
      method: 'POST',
      body: JSON.stringify(User),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
}

export async function DisconnectFromRoom() {
  try {
    const response = await fetch(`${api_url}/user/disconnect`, {
      method: 'POST',
      body: JSON.stringify(GetSessionUser()),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const usr = GetSessionUser();
    console.log(usr);
    usr['room_id'] = 0;
    usr['id'] = 0;
    usr['team'] = 0;
    UpdateUser(usr);
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
}