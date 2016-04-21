import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './app';


import * as constants from './common/constants';
const countries = constants.AVAILABLE_COUNTRIES_OPTION.map(obj => ({ ...obj }));
countries[0].selected = true;
countries[1].selected = true;

const bannerIds = ['1'];

const propsById = {
  1: {
    width: 320,
    height: 50,
  },
};


const initialState = {
  page: constants.PAGE.addImages,
  selectedChannel: constants.AVAILABLE_CHANNELS_OPTION[0],
  templates: [
    { value: '320x50_1', selected: true },
    { value: '320x50_2', selected: true },
    { value: '320x250_1', selected: true },
  ],
  countries,
  propsById,
  bannerIds,
};


ReactDOM.render(
  <Provider
    store={createStore(
      rootReducer,
      initialState,
      // {},
      window.devToolsExtension ? window.devToolsExtension() : undefined
    )}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
