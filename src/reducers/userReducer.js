import { LOGIN, LOGOUT } from '../constants';

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
    default:
      return state;
  }
};
