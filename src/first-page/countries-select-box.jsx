import React from 'react';
import { connect } from 'react-redux';
import { MultiSelectBox } from '../common/multi-select';


const CountriesSelectBox = ({ style, onChange, countries }) => {
  const defaultStyle = {};

  return (
    <MultiSelectBox
      title="Select Countries"
      style={{ ...defaultStyle, ...style }}
      labels={countries}
      onChange={onChange}
      required
    />
  );
};

CountriesSelectBox.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  countries: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

CountriesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  (state) => {
    // temporary, for inspection
    console.log(state);
    return {
      countries: state.countries,
    };
  },
  dispatch => ({
    onChange: countries => dispatch({
      type: 'SELECT_COUNTRIES',
      countries,
    }),
  })
)(CountriesSelectBox);
