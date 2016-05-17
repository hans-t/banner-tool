import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';


const SaveBtn = ({ onClick }) => (
  <RaisedButton
    primary
    onClick={onClick}
    label="Download Selected Banners"
  />
);

SaveBtn.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};


export default SaveBtn;
