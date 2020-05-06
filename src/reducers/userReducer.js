import { LOGIN, LOGOUT, UPDATE_USER, SET_USER } from '../constants';

const initialState = {
  user: {},
  isAuthenticated: false
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
    case SET_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };
    case LOGOUT:
      return initialState;
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      };
    default:
      return state;
  }
};
