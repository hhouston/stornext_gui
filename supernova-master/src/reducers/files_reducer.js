import { RECEIVE_FILES } from '../actions/files_actions';

const filesReducer = (state = {}, action) => {
  console.log('action:', action);
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FILES:
      return action.files.files;
    default:
      return state;
  }
};

export default filesReducer;
