import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IndexView from './index-page/view';
import SourcesView from './sources-page/view';
import CopyView from './copy-page/view';
import TextsView from './texts-page/view';
import ResultsView from './results-page/view';

injectTapEventPlugin();


const pages = [
  <IndexView />,
  <SourcesView />,
  <CopyView />,
  <TextsView />,
  <ResultsView />,
];


// component for glueing components from different domain
const App = ({ currentPageNum }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>{pages[currentPageNum]}</div>
  </MuiThemeProvider>
);

App.propTypes = {
  currentPageNum: React.PropTypes.number.isRequired,
};


export default connect(
  state => ({ currentPageNum: state.pageNum })
)(App);
