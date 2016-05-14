import React from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { addSource } from './actionCreators';


const styles = {
  button: {
    position: 'absolute',
    top: '-20px',
  },
};


const AddSourceBtn = ({ onClick, style }) => (
  <span>
    <FloatingActionButton
      mini
      primary
      style={{ ...styles.button, ...style }}
      onClick={onClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </span>
);


AddSourceBtn.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};


export default connect(
  null,
  dispatch => ({
    onClick: () => dispatch(addSource()),
  })
)(AddSourceBtn);
