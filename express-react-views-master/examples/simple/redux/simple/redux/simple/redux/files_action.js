import _fetchFiles from './files_api_util';

export const RECEIVE_FILES = 'RECEIVE_FILES';

export const fetchFiles = root => dispatch => (
  _fetchFiles(root)
    .then(files => dispatch(receiveFiles(files)))
);

export const receiveFiles = (files) => ({
  type: RECEIVE_FILES,
  files
});
