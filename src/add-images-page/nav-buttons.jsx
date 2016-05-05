import React from 'react';
import { connect } from 'react-redux';

import NavButton from '../common/nav-btn';

import { PAGE } from '../common/constants';
import { changePage } from '../common/actionCreators';


const IndexBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(changePage(PAGE.index)),
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
    onClick: () => dispatch(changePage(PAGE.addTexts)),
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
