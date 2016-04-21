import React from 'react';

import Tabs from '../common/tabs';
import { OuterContainer } from './containers';


export default class TabbedOuterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.styles = {
      container: {
        paddingLeft: 0,
        display: 'flex',
      },

      tabs: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
      },

      content: {
        flex: 6,
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
    const { container, tabs, content } = this.styles;
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
      <OuterContainer style={container}>
        <Tabs
          items={countries}
          onItemClick={this.handleTabClick}
          style={tabs}
        />
        <div style={content}>{proppedChildren}</div>
      </OuterContainer>
    );
  }
}

TabbedOuterContainer.propTypes = {
  countries: React.PropTypes.array.isRequired,
  children: React.PropTypes.node.isRequired,
};
