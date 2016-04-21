import React from 'react';
import { connect } from 'react-redux';

import ImageSourcesBox from './image-sources';
import TabbedOuterContainer from '../common/tabbed-outer-container';


const View = ({ countries }) => (
  <TabbedOuterContainer countries={countries}>
    <ImageSourcesBox />
  </TabbedOuterContainer>
);

View.propTypes = {
  countries: React.PropTypes.array.isRequired,
};

export default connect(
  state => ({
    countries: state.countries.filter(country => country.selected).map(el => el.value),
  }),
  null
)(View);
