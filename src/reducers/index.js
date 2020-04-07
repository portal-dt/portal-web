import { combineReducers } from 'redux';
import { testReducer } from './testReducer';
import { configsReducer } from './configsReducer';

const rootReducer = combineReducers({
  test: testReducer,
  configs: configsReducer
});

export default rootReducer;
