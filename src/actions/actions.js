import { CHANGE_LANG, LOGIN, LOGOUT, UPDATE_USER } from '../constants';

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

export const updateUserAction = (userData) => ({
  type: UPDATE_USER,
  payload: userData
});