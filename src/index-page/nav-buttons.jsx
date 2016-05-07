import React from 'react';
import { connect } from 'react-redux';

import NavButton from '../common/nav-btn';

import { goToNextPage } from '../common/actionCreators';


const AddImagesBtn = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(goToNextPage()),
  }),
  (stateProps, dispatchProps) => ({
    ...dispatchProps,
    label: 'Add Images',
  })
)(NavButton);


export default { nextBtn: <AddImagesBtn /> };
