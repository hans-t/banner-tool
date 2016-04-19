import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './app';


import * as constants from './common/constants';
const countries = constants.AVAILABLE_COUNTRIES_OPTION;
countries[0].selected = true;
const initialState = {
  page: constants.PAGE.addImages,
  selectedChannel: constants.AVAILABLE_CHANNELS_OPTION[0],
  templates: [
    { value: '320x50_1', selected: true },
    { value: '320x50_2', selected: true },
    { value: '320x250_1', selected: true },
  ],
  countries,
};


ReactDOM.render(
  <Provider store={createStore(rootReducer, initialState)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
