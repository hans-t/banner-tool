import React from 'react';

import { blueA700 } from 'material-ui/styles/colors';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';


const style = {
  icon: {
    position: 'absolute',
    right: 0,
  },
};


const CheckCircleIcon = ({ selected }) => (
  <ActionCheckCircle
    color={blueA700}
    style={{ ...style.icon, opacity: selected ? 0.7 : 0 }}
  />
);

CheckCircleIcon.propTypes = {
  selected: React.PropTypes.bool.isRequired,
};


export default CheckCircleIcon;
