import {api_url} from '../constants/api';
import {UpdateState} from '../utils/utils';
import {ConnectToRoom} from './user';

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

export async function CreateNewRoom(dispatch) {
  try {
    const response = await fetch(`${api_url}/room/new`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson['message'] === 'OK') {
      ConnectToRoom(responseJson['room']['room_id'], 1)
      .catch(err => console.warn(err))
      .then(() => UpdateState(dispatch));
    } else {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function DeleteRoom(RoomID, IsCreator) {
  if (IsCreator)
    try {
      const response = await fetch(`${api_url}/room/delete/${RoomID}`, {
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

export async function CreateNewTeam(RoomID, NewTeamID, Callback) {
  try {
    const response = await fetch(
        `${api_url}/room/create/team/${RoomID}/${NewTeamID}`, {
          method: 'POST',
        });
    const responseJson = await response.json();
    if (responseJson['message'] === 'OK') {
      console.log(responseJson['room']['teams']);
      Callback(responseJson['room']['teams']);
    } else {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function GetRoomData(RoomID, Callback) {
  try {
    const response = await fetch(`${api_url}/room/get/id/${RoomID}`, {
      method: 'GET',
    });
    const responseJson = await response.json();
    if (responseJson['message'] === 'OK') {
      Callback(responseJson['room']);
    } else {
      console.warn(responseJson['message']);
    }
  } catch (err) {
    console.warn(err);
  }
}