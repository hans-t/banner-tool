import React from 'react';
import { connect } from 'react-redux';
import { MultiSelectBox } from './common/multi-select';


const SelectBox = ({ style, onChange }) => {
  const labels = [
    { value: 'SG', checked: false },
    { value: 'MY', checked: false },
    { value: 'TH', checked: false },
    { value: 'ID', checked: false },
    { value: 'VN', checked: false },
    { value: 'PH', checked: false },
    { value: 'TW', checked: false },
    { value: 'HK', checked: false },
  ];

  const defaultStyle = {
  };

  return (
    <MultiSelectBox
      title="Select Countries"
      style={{ ...defaultStyle, ...style }}
      labels={labels}
      onChange={onChange}
    />
  );
};

SelectBox.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};

SelectBox.defaultProps = {
  style: {},
};


export default connect(
  // For inspection
  (state) => {console.log(state); return {};},

  // (state) => ({}),
  dispatch => ({
    onChange: countries => dispatch({
      type: 'SELECT_COUNTRIES',
      countries,
    }),
  })
)(SelectBox);
