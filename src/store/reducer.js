import * as actions from './actionTypes';

const themePreferences = localStorage.getItem('themePreferences');
if (!themePreferences) {
  localStorage.setItem('themePreferences', 'light');
}
const savedName = localStorage.getItem('userNickName');
if (!savedName) {
  localStorage.setItem('userNickName', 'NewUser');
}
export default function reducer(
    state = {
      themeState: localStorage.getItem('themePreferences'),
      NICK_NAME: localStorage.getItem('userNickName'),
      ACCOUNT_DIALOG_STATE: false,
    }, action) {
  switch (action.type) {
    case actions.NICK_NAME_STATE:
      return {
        NICK_NAME: action.payload,
        themeState: state.themeState,
        ACCOUNT_DIALOG_STATE: state.ACCOUNT_DIALOG_STATE,
      };
    case actions.THEME_STATE:
      return {
        themeState: action.payload,
        NICK_NAME: state.NICK_NAME,
        ACCOUNT_DIALOG_STATE: state.ACCOUNT_DIALOG_STATE,
      };
    case actions.ACCOUNT_STATE:
      return {
        themeState: state.themeState,
        NICK_NAME: state.NICK_NAME,
        ACCOUNT_DIALOG_STATE: action.payload,
      };
    default:
      return state;
  }
}