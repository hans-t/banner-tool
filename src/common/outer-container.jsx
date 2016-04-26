import React from 'react';
import Paper from 'material-ui/lib/paper';


const OuterContainer = ({ style, children }) => {
  const defaultStyle = {
    width: '90%',
    height: '90vh',
    margin: '3vh auto',
    padding: '2% 3%',
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
