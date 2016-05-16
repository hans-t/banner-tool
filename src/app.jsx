import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IndexView from './index-page/view';
import SourcesView from './sources-page/view';
import AddCopiesView from './add-copies-page/view';
import EditCopiesView from './edit-copies-page/view';
import ResultsView from './results-page/view';


const pages = [
  <IndexView />,
  <SourcesView />,
  <AddCopiesView />,
  <EditCopiesView />,
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
