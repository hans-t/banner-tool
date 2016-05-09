import React from 'react';

import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';


const defaultStyle = {
  width: '100%',
  overflowY: 'auto',
  // backgroundColor: Colors.indigo400,
};


const TextsBox = ({ style }) => {
  return (
    <Paper style={{ ...defaultStyle, ...style }} zDepth={1} />
  );
};


TextsBox.propTypes = {
  style: React.PropTypes.object,
};

export default TextsBox;