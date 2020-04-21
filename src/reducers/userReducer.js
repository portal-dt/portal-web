import { LOGIN, LOGOUT, UPDATE_USER } from '../constants';

const initialState = {
  user: {},
  isAuthenticated: false
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      const { user, isAuthenticated } = payload;
      return {
        ...state,
        user,
        isAuthenticated
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
