import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IndexView from './index-page/view';
import SourcesView from './sources-page/view';
import AddCopiesView from './add-copies-page/view';
import EditCopiesView from './edit-copies-page/view';
import BannerSettingsView from './banner-settings-page/view';
import ResultsView from './results-page/view';
import TemplateEditor from './template-editor/view';


const pages = [
  IndexView,
  SourcesView,
  AddCopiesView,
  EditCopiesView,
  BannerSettingsView,
  ResultsView,
];


function router({ currentPageNum }, { route }) {
  switch (route) {
    case '/editor':
      return TemplateEditor;

    default:
      return pages[currentPageNum];
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash.substr(1),
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => this.setState({
      route: window.location.hash.substr(1),
    }));
  }

  render() {
    const Child = router(this.props, this.state);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Child />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  currentPageNum: React.PropTypes.number.isRequired,
};


export default connect(
  state => ({ currentPageNum: state.pageNum })
)(App);
