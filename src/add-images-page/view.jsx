import React from 'react';
import { connect } from 'react-redux';

import ImageSourcesBox from './image-sources';
import BannerResultsBox from '../banner/results';
import TabbedOuterContainer from '../common/tabbed-outer-container';


const View = ({ countries }) => (
  <TabbedOuterContainer countries={countries}>
    <ImageSourcesBox style={{ height: '20%' }} />
    <span style={{ height: '2%' }} />
    <BannerResultsBox style={{ height: '78%' }} />
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
