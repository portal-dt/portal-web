import { CONSTANT } from "../constants";

export const testReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANT:
      return {
        b: action.payload,
        state
      };
    default:
      return state;
  }
};