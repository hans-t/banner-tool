import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { countriesSelectionActionCreators } from './actionCreators';
import { MultiSelectBox } from '../common/multi-select';


const CountriesSelectBox = ({ style, selectCountries, countries }) => {
  const defaultStyle = {};

  return (
    <MultiSelectBox
      title="Select Countries"
      style={{ ...defaultStyle, ...style }}
      labels={countries}
      onChange={selectCountries}
      required
    />
  );
};

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
  dispatch => bindActionCreators(countriesSelectionActionCreators, dispatch)
)(CountriesSelectBox);
