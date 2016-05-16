import React from 'react';


const style = {
  display: 'flex',
  justifyContent: 'space-between',
};


const NavBtnContainer = ({ leftBtn, rightBtn }) => (
  <div style={style}>
    {leftBtn}
    {rightBtn}
  </div>
);

NavBtnContainer.propTypes = {
  leftBtn: React.PropTypes.node.isRequired,
  rightBtn: React.PropTypes.node.isRequired,
};

NavBtnContainer.defaultProps = {
  leftBtn: <span />,
  rightBtn: <span />,
};


export default NavBtnContainer;
