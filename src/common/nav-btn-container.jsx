import React from 'react';


const NavBtnContainer = ({ prevBtn, nextBtn }) => {
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  return (
    <div style={style}>
      {prevBtn}
      {nextBtn}
    </div>
  );
};

NavBtnContainer.propTypes = {
  prevBtn: React.PropTypes.node.isRequired,
  nextBtn: React.PropTypes.node.isRequired,
};


export default NavBtnContainer;
