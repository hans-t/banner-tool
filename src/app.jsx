import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FirstPageView from './first-page/view';
import AddImagesView from './add-images-page/view';
import { PAGE } from './common/constants';

injectTapEventPlugin();


// component for glueing components from different domain
const App = ({ page }) => {
  let view;
  switch (page) {
    case PAGE.index:
      view = <FirstPageView />;
      break;

    case PAGE.addImages:
      view = <AddImagesView />;
      break;

    default:
      view = <FirstPageView />;
      break;
  }

  return <div>{view}</div>;
};

App.propTypes = {
  page: React.PropTypes.string.isRequired,
};


export default connect(
  state => ({ page: state.page })
)(App);
