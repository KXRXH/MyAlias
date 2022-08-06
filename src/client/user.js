import {GetSessionUser, UpdateUser} from '../utils/utils';
import {api_url} from '../constants/api';

export async function ConnectToRoom(RoomID, IsCreator) {
  try {
    const user = GetSessionUser();
    const response = await fetch(
        `${api_url}/user/connect/${RoomID}/${IsCreator}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    const responseJson = await response.json();
    if (responseJson['message'] === 'OK') {
      user['id'] = responseJson['user_id'];
      user['room_id'] = RoomID;
      user['status'] = false;
      UpdateUser(user);
    }
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

export async function ChangeStatus() {
  try {
    const user = GetSessionUser();
    console.log(user);
    const url = `${api_url}/user/set/ready/${user['room_id']}/${user['id']}`;
    console.log(url);
    const response = await fetch(url, {
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

export async function ChangeTeam(RoomID, UserID, TeamID) {
  try {
    const response = await fetch(
        `${api_url}/user/change/team/${RoomID}/${UserID}/${TeamID}`,
        {method: 'PUT'});
    const responseJSON = await response.json()
  } catch (err) {
    console.warn(err);
  }
}