import React from 'react';


const NextButtonContainer = ({ children }) => (
  <div style={{ textAlign: 'right' }}>{children}</div>
);

NextButtonContainer.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default NextButtonContainer;
