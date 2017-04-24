import { connect } from 'react-redux';
import Index from './index';
require('import-export');
var fetchFiles = require('../redux/files_action');
var asArray = require('../redux/selectors');



// import { fetchFiles } from '../redux/files_action';
// import { asArray } from '../redux/selectors';

const mapStateToProps = (state) => {
  return ({
    files: asArray(state.files),
    store: configureStore(reducer)
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchFiles: () => dispatch(fetchFiles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
