import * as actions from './actionTypes';


export const setNickNameDialogState = value => ({
  type: actions.NICK_NAME_DIALOG_STATE,
  payload: value,
});

export const setThemeState = value => ({
  type: actions.THEME_STATE,
  payload: value,
});