import React from 'react';
import { SliderPicker } from 'react-color';


const styles = {
  colorInput: {

  },
};


export default function ColorPicker({ color, onChange, style }) {
  return (
    <SliderPicker
      color={color}
      onChangeComplete={onChange}
      style={{ ...styles.colorInput, ...style }}
    />
  );
}

ColorPicker.propTypes = {
  color: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};
