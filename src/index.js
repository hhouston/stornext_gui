import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  store = configureStore();
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<App store={ store }/>, root);
});
