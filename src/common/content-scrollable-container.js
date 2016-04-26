import React from 'react';
import Paper from 'material-ui/lib/paper';


const ContentScrollableContainer = ({ style, children }) => {
  const defaultStyle = {
    width: '100%',
    height: '90%',
    overflowY: 'auto',
    marginBottom: '2%',
    padding: '2%',
  };

  return (
    <Paper style={{ ...defaultStyle, ...style }} zDepth={1}>
      {children}
    </Paper>
  );
};

ContentScrollableContainer.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

ContentScrollableContainer.defaultProps = {
  style: {},
};


export default ContentScrollableContainer;
