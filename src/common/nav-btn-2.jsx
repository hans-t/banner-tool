import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

import { goToPrevPageAction, goToNextPageAction } from './actionCreators';


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
  label,
  action,
  dispatcher = () => {},
  validator = defaultValidator,
}) {
  return connect(
    state => ({ ...state }),
    dispatch => ({ dispatch }),
    (state, { dispatch }, ownProps) => ({
      label,
      primary,
      onClick: () => {
        if (validator(state)) {
          dispatcher(dispatch, state, ownProps);
          dispatch(action(state.pageNum));
        }
      },
    })
  )(NavButton);
}


export function nextBtnFactory({ label, dispatcher, validator }) {
  return navBtnFactory({
    label,
    validator,
    dispatcher,
    primary: true,
    action: goToNextPageAction,
  });
}


export function prevBtnFactory({ label, dispatcher, validator }) {
  return navBtnFactory({
    label,
    validator,
    dispatcher,
    primary: false,
    action: goToPrevPageAction,
  });
}
