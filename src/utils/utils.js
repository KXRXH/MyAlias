import {rainbowColorCodes} from '../constants/colors';
import {GetAllRooms} from '../client/client';
import {setMainState} from '../store/actions';

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function GetRandomRainbowColor() {
  return rainbowColorCodes[Math.floor(Math.random() * 7)];
}

export function GetSessionUser() {
  return JSON.parse(sessionStorage.getItem('user'));
}

export function UpdateUser(NewUser) {
  sessionStorage.setItem('user', JSON.stringify(NewUser));
}

export function UpdateState(dispatch) {
  console.log('updating...');
  const getRooms = async () => {
    const response = await GetAllRooms();
    if (response['message'] === 'OK') {
      dispatch(setMainState(response['rooms']));
    } else {
      dispatch(setMainState([]));
    }
  };
  getRooms().catch(err => console.warn(err));
}