import React from 'react';
import { connect } from 'react-redux';

import { getSelectedCountries } from './helpers';
import TabbedContainer from './tabbed-container';


const CountryTabsContainer = ({ children, countries }) => (
  <TabbedContainer
    tabs={countries}
    tabsPropName="countries"
    currentTabPropName="currentCountry"
  >
    {children}
  </TabbedContainer>
);


CountryTabsContainer.propTypes = {
  children: React.PropTypes.node.isRequired,
  countries: React.PropTypes.array.isRequired,
};


export default connect(
  state => ({
    countries: getSelectedCountries(state.countries),
  }),
  null
)(CountryTabsContainer);
