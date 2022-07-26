import * as actions from './actionTypes';

const storedPreference = localStorage.getItem('themePreferences');
if (!storedPreference) {
  localStorage.setItem('themePreferences', 'light');
}
export default function reducer(
    state = {
      themeState:localStorage.getItem('themePreferences'),
      NICK_NAME_DIALOG_STATE: 'undefined user name',
    }, action) {
  switch (action.type) {
    case actions.NICK_NAME_DIALOG_STATE:
      return {
        NICK_NAME_DIALOG_STATE: action.payload,
        themeState: state.themeState,
      };
    case actions.THEME_STATE:
      return {
        themeState: action.payload,
        NICK_NAME_DIALOG_STATE: state.NICK_NAME_DIALOG_STATE,
      };
    default:
      return state;
  }
}