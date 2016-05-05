import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';


const NavButton = (props) => (<RaisedButton {...props} />);


NavButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  primary: React.PropTypes.bool,
};

NavButton.defaultProps = {
  primary: true,
};

export default NavButton;
