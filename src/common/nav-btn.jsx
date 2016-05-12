import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

import { goToPrevPageAction, goToNextPageAction } from './actionCreators';
import {
  mapRecombinerStateToProps,
  mapRecombinerDispatchProps,
  mergeRecombinerProps,
} from '../banner/recombiner';


const NavButton = (props) => (<RaisedButton {...props} />);


NavButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  primary: React.PropTypes.bool,
};

NavButton.defaultProps = {
  primary: true,
};


function defaultValidator() {
  return true;
}


function navBtnFactory({
  primary,
  action,
  label,
  recombineOnClick = false,
  validator = defaultValidator,
}) {
  return connect(
    state => {
      if (recombineOnClick) {
        return {
          ...mapRecombinerStateToProps(state),
          valid: validator(state),
          pageNum: state.pageNum,
        };
      } else {
        return {
          valid: validator(state),
          pageNum: state.pageNum,
        };
      }
    },
    dispatch => {
      if (recombineOnClick) {
        return {
          ...mapRecombinerDispatchProps(dispatch),
          changePage: ({ currentPageNum }) => dispatch(action(currentPageNum)),
        };
      } else {
        return {
          changePage: ({ currentPageNum }) => dispatch(action(currentPageNum)),
        };
      }
    },
    (stateProps, dispatchProps) => {
      const { changePage } = dispatchProps;
      const { recombine } = mergeRecombinerProps(stateProps, dispatchProps);
      return {
        label,
        primary,
        onClick: () => {
          if (stateProps.valid) {
            if (recombineOnClick) {
              recombine();
            }
            changePage({ currentPageNum: stateProps.pageNum });
          }
        },
      };
    }
  )(NavButton);
}


export function nextBtnFactory({ label, recombineOnClick, validator }) {
  return navBtnFactory({
    label,
    recombineOnClick,
    validator,
    primary: true,
    action: goToNextPageAction,
  });
}


export function prevBtnFactory({ label, recombineOnClick, validator }) {
  return navBtnFactory({
    label,
    recombineOnClick,
    validator,
    primary: false,
    action: goToPrevPageAction,
  });
}
