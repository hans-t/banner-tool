import React from 'react';
import { connect } from 'react-redux';

import { countriesSelectionActionCreators } from './actionCreators';
import { MultiSelectBox } from '../common/multi-select';


const CountriesSelectBox = ({ style, selectCountries, countries }) => (
  <MultiSelectBox
    title="Select Countries"
    style={style}
    labels={countries}
    onChange={selectCountries}
    required
  />
);

CountriesSelectBox.propTypes = {
  selectCountries: React.PropTypes.func.isRequired,
  countries: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

CountriesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({ countries: state.countries }),
  countriesSelectionActionCreators
)(CountriesSelectBox);
