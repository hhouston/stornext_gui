import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer.js';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {root: '/'}) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
