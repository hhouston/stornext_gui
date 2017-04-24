require('import-export');

var { createStore, applyMiddleware } = require('redux');
var RootReducer = require('./root_reducer.js');
var thunk = require('redux-thunk');

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

module.exports = configureStore;
