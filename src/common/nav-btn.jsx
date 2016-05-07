import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import { goToPrevPage, goToNextPage } from './actionCreators';


const NavButton = (props) => (<RaisedButton {...props} />);


NavButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  primary: React.PropTypes.bool,
};

NavButton.defaultProps = {
  primary: true,
};


export const nextBtnFactory = label => connect(
  null,
  dispatch => ({ onClick: () => dispatch(goToNextPage()) }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label,
  })
)(NavButton);


export const prevBtnFactory = label => connect(
  null,
  dispatch => ({ onClick: () => dispatch(goToPrevPage()) }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label,
    primary: false,
  })
)(NavButton);
