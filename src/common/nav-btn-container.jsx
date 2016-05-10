import React from 'react';


const style = {
  display: 'flex',
  justifyContent: 'space-between',
};


const NavBtnContainer = ({ prevBtn, nextBtn }) => (
  <div style={style}>
    {prevBtn}
    {nextBtn}
  </div>
);

NavBtnContainer.propTypes = {
  prevBtn: React.PropTypes.node.isRequired,
  nextBtn: React.PropTypes.node.isRequired,
};

NavBtnContainer.defaultProps = {
  prevBtn: <span />,
  nextBtn: <span />,
};


export default NavBtnContainer;
