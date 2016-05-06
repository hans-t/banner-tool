import React from 'react';
import Paper from 'material-ui/lib/paper';


const OuterContainer = ({ style, children }) => {
  const defaultStyle = {
    width: '95vw',
    height: '90vh',
    margin: '5vh auto 0',
    padding: '2% 3%',
    boxSizing: 'border-box',
    overflowY: 'hidden',
  };

  return (
    <Paper style={{ ...defaultStyle, ...style }} zDepth={2}>
      {children}
    </Paper>
  );
};

OuterContainer.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

OuterContainer.defaultProps = {
  style: {},
};


export default OuterContainer;
