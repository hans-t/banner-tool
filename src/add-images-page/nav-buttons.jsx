import React from 'react';
import { connect } from 'react-redux';

import NavButton from '../common/nav-btn';

import { goToNextPage, goToPrevPage } from '../common/actionCreators';


const IndexBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(goToPrevPage()),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'Home',
    primary: false,
  })
)(NavButton);


const AddTextsBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(goToNextPage()),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'Add Texts',
  })
)(NavButton);


export default {
  prevBtn: <IndexBtn />,
  nextBtn: <AddTextsBtn />,
};
