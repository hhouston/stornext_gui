import { combineReducers } from 'redux';
import filesReducer from './files_reducer';

const RootReducer = combineReducers({
  files: filesReducer
})

export default RootReducer;
