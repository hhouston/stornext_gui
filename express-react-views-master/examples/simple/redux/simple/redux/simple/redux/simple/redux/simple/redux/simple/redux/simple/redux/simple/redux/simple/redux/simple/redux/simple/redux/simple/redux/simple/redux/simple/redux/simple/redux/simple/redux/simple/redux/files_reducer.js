import { RECEIVE_FILES } from './files_action';

const filesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FILES:
      return action.files;
    default:
      return state;
  }
};

export default filesReducer;
