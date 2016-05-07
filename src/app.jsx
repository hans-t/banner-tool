import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IndexView from './index-page/view';
import AddImagesView from './add-images-page/view';
import AddTextsView from './add-texts-page/view';

injectTapEventPlugin();


const pages = [
  <IndexView />,
  <AddImagesView />,
  <AddTextsView />,
];


// component for glueing components from different domain
const App = ({ currentPageNum }) => (
  <div>{pages[currentPageNum]}</div>
);

App.propTypes = {
  currentPageNum: React.PropTypes.number.isRequired,
};


export default connect(
  state => ({ currentPageNum: state.pageNum })
)(App);
