import React from 'react';
import { connect } from 'react-redux';

import NavButton from '../common/nav-btn';

import { PAGE } from '../common/constants';
import { changePage } from '../common/actionCreators';


const AddImagesBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(changePage(PAGE.addImages)),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'Add Images',
    primary: false,
  })
)(NavButton);


const ResultsBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(changePage(PAGE.results)),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'See results',
  })
)(NavButton);


export default {
  prevBtn: <AddImagesBtn />,
  nextBtn: <ResultsBtn />,
};
