import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import {
  NextButton,
  PrevButton
} from '../common/navigation-buttons';

import { PAGE } from '../common/constants';
import { changePage } from '../common/actionCreators';





export default connect(
  (state) => ({
    bannerIds,
  }),
  (dispatch) => ({
    onAddImagesBtnClick: () => dispatch(changePage(PAGE.addImages)),
  })
)(addImagesBtn);
