import { combineReducers } from 'redux';
import { configsReducer } from './configsReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  configs: configsReducer,
  user: userReducer
});

export default rootReducer;
