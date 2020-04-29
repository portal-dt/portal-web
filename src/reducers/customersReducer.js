import { GET_CUSTOMERS } from '../constants';


const initialState = {
  customers: []
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        customers: action.payload
      };
    default:
      return state;
  }
};