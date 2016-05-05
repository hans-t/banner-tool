import React from 'react';
import { connect } from 'react-redux';

import TabbedContainer from './tabbed-container';
import OuterContainer from './outer-container';


const TabbedOuterContainer = ({ children, countries }) => (
  <OuterContainer>
    <TabbedContainer countries={countries}>
      {children}
    </TabbedContainer>
  </OuterContainer>
);


TabbedOuterContainer.propTypes = {
  children: React.PropTypes.node.isRequired,
  countries: React.PropTypes.array.isRequired,
};


export default connect(
  state => ({
    countries: state.countries.filter(country => country.selected).map(el => el.value),
  }),
  null
)(TabbedOuterContainer);
