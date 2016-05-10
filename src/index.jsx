import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './app';
import initialState from './initialState';


ReactDOM.render(
  <Provider
    store={createStore(
      rootReducer,
      // initialState,
      {},
      window.devToolsExtension ? window.devToolsExtension() : undefined
    )}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
