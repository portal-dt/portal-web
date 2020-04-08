import { CONSTANT, CHANGE_LANG } from '../constants';

export const constant = () => ({
  type: CONSTANT,
  payload: {
    a: 'sadasdsad'
  }
});

export const changeLang = (language) => ({
  type: CHANGE_LANG,
  payload: language
});