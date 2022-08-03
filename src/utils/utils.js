import {rainbowColorCodes} from '../constants/colors';
import {setMainState} from '../store/actions';
import {GetAllRooms} from '../client/rooms';

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
  const getRooms = async () => {
    const response = await GetAllRooms();
    if (response['message'] === 'OK') {
      console.log('updating...');
      dispatch(setMainState(response['rooms']));
    } else {
      dispatch(setMainState([]));
    }
  };
  getRooms().catch(err => console.warn(err));
}