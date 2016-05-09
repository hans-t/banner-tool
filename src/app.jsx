import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IndexView from './index-page/view';
import AddImagesView from './add-images-page/view';
import CopyView from './copy-page/view';
import TextsView from './texts-page/view';
import ResultsView from './results-page/view';

injectTapEventPlugin();


const pages = [
  <IndexView />,
  <AddImagesView />,
  <CopyView />,
  <TextsView />,
  <ResultsView />,
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
