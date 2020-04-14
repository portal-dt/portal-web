import { CHANGE_LANG, LOGIN, LOGOUT } from '../constants';

export const changeLang = (language) => ({
  type: CHANGE_LANG,
  payload: language
});

export const loginAction = (userData) => ({
  type: LOGIN,
  payload: userData
});

export const logoutAction = () => ({
  type: LOGOUT
});