import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './reducers';
import initialState from './initialState';
import App from './app';
import TemplateEditor from './template-editor';

import '../static/css/fonts.css';


injectTapEventPlugin();


// stupid way of routing, will need to refactor this in the future.
const { pathname } = window.location;
if (pathname === '/') {
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
} else if (pathname === '/editor') {
  ReactDOM.render(
    <TemplateEditor />,
    document.getElementById('app')
  );
}

