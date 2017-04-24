import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/index.js';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
