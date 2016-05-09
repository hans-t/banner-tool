import React from 'react';

import Tabs from '../common/tabs';
import Paper from 'material-ui/lib/paper';


/**
 * Apparently TabbedContainer requires hack for tabs and childrenContainer, because
 * collapsing tabs. Bug: after rendering banners, going back to index page and then
 * go back again to images, tabs collapse.
 */
export default class TabbedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.styles = {
      container: {
        width: '100%',
        height: '95%',
        marginBottom: '1%',
        padding: 0,
        display: 'flex',
      },

      tabs: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        minWidth: '12%', // hack: floor(1/(1+7))
      },

      childrenContainer: {
        flex: 7,
        boxSizing: 'border-box',
        height: '100%',
        minWidth: '87%', // hack: floor(7/(1+7))
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
