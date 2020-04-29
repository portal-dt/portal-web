import { combineReducers } from 'redux';
import { configsReducer } from './configsReducer';
import { userReducer } from './userReducer';
import { customersReducer } from './customersReducer';

const rootReducer = combineReducers({
  configs: configsReducer,
  user: userReducer,
  customers: customersReducer
});

export default rootReducer;
