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
      currentCountry: props.countries[0],
    };
  }

  handleTabClick(selectedCountry) {
    this.setState({ currentCountry: selectedCountry });
  }

  render() {
    const { container, tabs, childrenContainer } = this.styles;
    const { countries } = this.props;
    const proppedChildren = React.Children.map(this.props.children, child => (
      // Children can't set these props to isRequired
      // https://github.com/facebook/react/issues/4494
      React.cloneElement(child, {
        currentCountry: this.state.currentCountry,
        countries,
      })
    ));

    return (
      <Paper style={container}>
        <Tabs
          items={countries}
          onItemClick={this.handleTabClick}
          style={tabs}
        />
        <div style={childrenContainer}>{proppedChildren}</div>
      </Paper>
    );
  }
}

TabbedContainer.propTypes = {
  countries: React.PropTypes.array.isRequired,
  children: React.PropTypes.node.isRequired,
};
