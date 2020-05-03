import {
  CHANGE_LANG,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  SET_USER,
  SET_LOADING,
  GET_CUSTOMERS
} from '../constants';

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

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: user
});

export const getCustomersAction = (customers) => ({
  type: GET_CUSTOMERS,
  payload: customers
});

export const setLoadingAction = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});
