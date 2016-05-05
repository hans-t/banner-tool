import React from 'react';

import Tabs from '../common/tabs';
import Paper from 'material-ui/lib/paper';


export default class TabbedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.styles = {
      container: {
        width: '100%',
        height: '90%',
        overflowY: 'hidden',
        marginBottom: '2%',
        padding: 0,
        display: 'flex',
      },

      tabs: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      },

      childrenContainer: {
        flex: 7,
        boxSizing: 'border-box',
        padding: '2% 2% 0',
        height: '100%',
      },
    };

    this.state = {
      currentTab: props.tabs[0],
    };
  }

  handleTabClick(currentTab) {
    this.setState({ currentTab });
  }

  render() {
    const { tabs, currentTabPropName, tabsPropName } = this.props;
    const proppedChildren = React.Children.map(this.props.children, child => (
      // Children can't set these props to isRequired
      // https://github.com/facebook/react/issues/4494
      React.cloneElement(child, {
        [currentTabPropName]: this.state.currentTab,
        [tabsPropName]: tabs,
      })
    ));

    return (
      <Paper style={this.styles.container}>
        <Tabs
          tabs={tabs}
          onTabClick={this.handleTabClick}
          style={this.styles.tabs}
        />
        <div style={this.styles.childrenContainer}>{proppedChildren}</div>
      </Paper>
    );
  }
}

TabbedContainer.propTypes = {
  tabs: React.PropTypes.array.isRequired,
  children: React.PropTypes.node.isRequired,
  currentTabPropName: React.PropTypes.string,
  tabsPropName: React.PropTypes.string,
};

TabbedContainer.defaultProps = {
  currentTabPropName: 'currentTab',
  tabsPropName: 'tabs',
};
