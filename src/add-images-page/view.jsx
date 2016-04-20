import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../common/tabs';
import ImageSourcesBox from './image-sources';
import { OuterContainer } from '../common/containers';


class View extends React.Component {
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
    console.log(selectedCountry);
    this.setState({ currentCountry: selectedCountry });
  }

  render() {
    const { container, tabs, content } = this.styles;
    return (
      <OuterContainer style={container}>
        <Tabs
          items={this.props.countries}
          onItemClick={this.handleTabClick}
          style={tabs}
        />
        <div style={content}>
          <ImageSourcesBox
            currentCountry={this.state.currentCountry}
            countries={this.props.countries}
          />
        </div>
      </OuterContainer>
    );
  }
}

View.propTypes = {
  countries: React.PropTypes.array.isRequired,
};

export default connect(
  state => ({
    countries: state.countries.filter(country => country.selected).map(el => el.value),
  }),
  null
)(View);
