import { combineReducers } from 'redux';
import filesReducer from './files_reducer';

const rootReducer = combineReducers({
  files: filesReducer
});

export default rootReducer;
