import { CHANGE_LANG } from '../constants';

const initialState = {
  language: 'en'
}

export const configsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        language: action.payload
      };
    default:
      return state;
  }
};