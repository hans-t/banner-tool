import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './reducers';
import App from './app';
import initialState from './initialState';

import '../static/css/fonts.css';


injectTapEventPlugin();


ReactDOM.render(
  <Provider
    store={createStore(
      rootReducer,
      initialState,
      window.devToolsExtension ? window.devToolsExtension() : undefined
    )}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
