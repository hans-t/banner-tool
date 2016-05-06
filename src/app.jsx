import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IndexView from './index-page/view';
import AddImagesView from './add-images-page/view';
import AddTextsView from './add-texts-page/view';
import { PAGE } from './common/constants';

injectTapEventPlugin();


// component for glueing components from different domain
const App = ({ currentPage }) => {
  let view;
  switch (currentPage) {
    default:
    case PAGE.index:
      view = <IndexView />;
      break;

    case PAGE.addImages:
      view = <AddImagesView />;
      break;

    case PAGE.addTexts:
      view = <AddTextsView />;
      break;
  }

  return <div>{view}</div>;
};

App.propTypes = {
  currentPage: React.PropTypes.string,
};


export default connect(
  state => ({ currentPage: state.page })
)(App);
