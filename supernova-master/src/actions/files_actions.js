import * as FilesAPIUtil from './home';

export const RECEIVE_FILES = 'RECEIVE_FILES';

export const fetchFiles = root => dispatch => {
  console.log(root);
  return (
  FilesAPIUtil.fetchFiles(root)
    .then(files => dispatch(receiveFiles(files)))
)};

export const receiveFiles = (files) => ({
  type: RECEIVE_FILES,
  files
});
