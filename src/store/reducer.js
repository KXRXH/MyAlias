import * as actions from './actionTypes';

const themePreferences = localStorage.getItem('themePreferences');
if (!themePreferences) {
  localStorage.setItem('themePreferences', 'dark');
}
const savedName = localStorage.getItem('userNickName');
if (!savedName) {
  localStorage.setItem('userNickName', 'NewUser');
}
export default function reducer(
    state = {
      themeState: localStorage.getItem('themePreferences'),
      mainState: [],
      nickName: localStorage.getItem('userNickName'),
      accountDialogState: false,
    }, action) {
  switch (action.type) {
    case actions.NICK_NAME_STATE:
      return {
        nickName: action.payload,
        themeState: state.themeState,
        accountDialogState: state.accountDialogState,
        mainState: state.mainState
      };
    case actions.THEME_STATE:
      return {
        themeState: action.payload,
        nickName: state.nickName,
        accountDialogState: state.accountDialogState,
        mainState: state.mainState
      };
    case actions.ACCOUNT_STATE:
      return {
        themeState: state.themeState,
        nickName: state.nickName,
        accountDialogState: action.payload,
        mainState: state.mainState
      };
    case actions.MAIN_STATE:
      return {
        themeState: state.themeState,
        nickName: state.nickName,
        accountDialogState: state.accountDialogState,
        mainState: action.payload
      };
    default:
      return state;
  }
}