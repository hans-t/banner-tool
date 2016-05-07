import React from 'react';
import { connect } from 'react-redux';

import NavButton from '../common/nav-btn';

import { goToPrevPage } from '../common/actionCreators';


const AddImagesBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(goToPrevPage()),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'Add Images',
    primary: false,
  })
)(NavButton);


// const ResultsBtn = connect(
//   null,
//   dispatch => ({
//     onClick: () => dispatch(goToNextPage())),
//   }),
//   (stateProps, dispatchProps) => ({
//     ...dispatchProps,
//     label: 'See results',
//   })
// )(NavButton);


export default {
  prevBtn: <AddImagesBtn />,
  // nextBtn: <ResultsBtn />,
};
