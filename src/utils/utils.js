import {rainbowColorCodes} from '../constants/colors';

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function GetRandomRainbowColor() {
  return rainbowColorCodes[Math.floor(Math.random() * 7)]
}

export function GetSessionUser() {
  return JSON.parse(sessionStorage.getItem('user'));
}
export function UpdateUser(NewUser) {
  sessionStorage.setItem('user', JSON.stringify(NewUser));
}