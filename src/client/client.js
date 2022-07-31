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

export async function ConnectToRoom(RoomId) {
  try {
    const user = GetSessionUser();
    const response = await fetch(`${api_url}/user/connect/${RoomId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    user['id'] = responseJson['user_id'];
    user['room_id'] = RoomId;
    user['status'] = false;
    UpdateUser(user);
  } catch (err) {
    console.warn(err);
  }
}

export async function DisconnectFromRoom() {
  try {
    const response = await fetch(`${api_url}/user/disconnect`, {
      method: 'PUT',
      body: JSON.stringify(GetSessionUser()),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = GetSessionUser();
    user['room_id'] = 0;
    user['id'] = 0;
    user['team'] = 0;
    UpdateUser(user);
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
}

export async function CreateNewRoom() {
  try {
    const response = await fetch(`${api_url}/room/new`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson['message'] === 'OK') {
      ConnectToRoom(responseJson['room']['room_id']).
          catch(err => console.warn(err));
    } else {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function DeleteRoom(RoomId) {
  try {
    const response = await fetch(`${api_url}/room/delete/${RoomId}`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson['message'] !== 'OK') {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function ChangeStatus() {
  try {
    const user = GetSessionUser();
    const response = await fetch(
        `${api_url}/user/set/ready/${user['room_id']}/${user['id']}`, {
          method: 'PUT',
        });
    const responseJson = await response.json();
    if (responseJson['message'] !== 'OK') {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}