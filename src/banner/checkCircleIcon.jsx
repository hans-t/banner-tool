import React from 'react';

import Colors from 'material-ui/lib/styles/colors';
import ActionCheckCircle from 'material-ui/lib/svg-icons/action/check-circle';


const CheckCircleIcon = ({ selected }) => {
  const style = {
    position: 'absolute',
    right: 0,
    opacity: selected ? 1 : 0,
  };

  return (
    <ActionCheckCircle style={style} color={Colors.blueA200} />
  );
};

CheckCircleIcon.propTypes = {
  selected: React.PropTypes.bool.isRequired,
};


export default CheckCircleIcon;
