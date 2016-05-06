import React from 'react';
import ActionCheckCircle from 'material-ui/lib/svg-icons/action/check-circle';


const CheckCircleIcon = ({ selected }) => {
  const style = {
    position: 'absolute',
    right: 0,
    opacity: selected ? 1 : 0,
  };

  return (
    <ActionCheckCircle style={style} />
  );
};

CheckCircleIcon.propTypes = {
  selected: React.PropTypes.bool.isRequired,
};


export default CheckCircleIcon;
