import * as actions from './actionTypes';


export const setNickName = value => ({
  type: actions.NICK_NAME_STATE,
  payload: value,
});

export const setThemeState = value => ({
  type: actions.THEME_STATE,
  payload: value,
});

export const setAccountDialogState = value => ({
  type: actions.ACCOUNT_STATE,
  payload: value,
});