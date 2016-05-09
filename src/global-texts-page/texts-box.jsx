import React from 'react';

const defaultStyle = {
  width: '100%',
  height: '95%',
  marginBottom: '1%',
  padding: 0,
  overflowY: 'auto',
};


const TextsBox = ({ style }) => {
  return (
    <div style={{ ...defaultStyle, ...style }}>
      <h1>Hello World</h1>
    </div>
  );
};


TextsBox.propTypes = {
  style: React.PropTypes.object,
};

export default TextsBox;
