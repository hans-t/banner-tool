import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import { goToPrevPageAction, goToNextPageAction } from './actionCreators';
import {
  mapRecombinerStateToProps,
  mapRecombinerDispatchProps,
  mergeRecombinerProps,
} from '../banner/recombiner';


export const NavButton = (props) => (<RaisedButton {...props} />);


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
  dispatch => ({ onClick: () => dispatch(goToNextPageAction()) }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label,
  })
)(NavButton);


export const prevBtnFactory = label => connect(
  null,
  dispatch => ({ onClick: () => dispatch(goToPrevPageAction()) }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label,
    primary: false,
  })
)(NavButton);


export function nextBtnWithRecombineFactory({ label, validator = () => true }) {
  return connect(
    state => ({
      ...mapRecombinerStateToProps(state),
      valid: validator(state),
    }),
    dispatch => ({
      ...mapRecombinerDispatchProps(dispatch),
      changePage: () => dispatch(goToNextPageAction()),
    }),
    (stateProps, dispatchProps) => {
      const { changePage } = dispatchProps;
      const { recombine } = mergeRecombinerProps(stateProps, dispatchProps);
      return {
        label,
        onClick: () => {
          if (stateProps.valid) {
            recombine();
            changePage();
          }
        },
      };
    }
  )(NavButton);
}


export function prevBtnWithRecombineFactory({ label, validator = () => true }) {
  return connect(
    state => ({
      ...mapRecombinerStateToProps(state),
      valid: validator(state),
    }),
    dispatch => ({
      ...mapRecombinerDispatchProps(dispatch),
      changePage: () => dispatch(goToPrevPageAction()),
    }),
    (stateProps, dispatchProps) => {
      const { changePage } = dispatchProps;
      const { recombine } = mergeRecombinerProps(stateProps, dispatchProps);
      return {
        label,
        primary: false,
        onClick: () => {
          if (stateProps.valid) {
            recombine();
            changePage();
          }
        },
      };
    }
  )(NavButton);
}
