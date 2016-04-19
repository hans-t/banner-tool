import React from 'react';
import Paper from 'material-ui/lib/paper';
import Menu from 'material-ui/lib/menus/menu';


export const ScrollableContainer = ({ style, className, children }) => {
  const defaultStyle = {
    overflowY: 'scroll',
    padding: '2%',
  };

  console.log({ ...defaultStyle, ...style });

  return (
    <Menu className={className} style={{ ...defaultStyle, ...style }}>
      {children}
    </Menu>
  );
};

ScrollableContainer.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

ScrollableContainer.defaultProps = {
  style: {},
  className: '',
};


export const ContentScrollableContainer = ({ style, children }) => {
  const defaultStyle = {
    width: '100%',
    height: '90%',
    overflowY: 'scroll',
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


export const OuterContainer = ({ children }) => {
  const style = {
    width: '90%',
    height: '90vh',
    margin: '3vh auto',
    padding: '2% 3%',
    overflowY: 'hidden',
  };

  return (
    <Paper style={style} zDepth={2}>
      {children}
    </Paper>
  );
};

OuterContainer.propTypes = {
  children: React.PropTypes.node,
};


export const NextButtonContainer = ({ children }) => (
  <div style={{ textAlign: 'right' }}>{children}</div>
);

NextButtonContainer.propTypes = {
  children: React.PropTypes.node.isRequired,
};
