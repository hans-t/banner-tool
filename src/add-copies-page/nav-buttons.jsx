import React from 'react';

import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';
import { translateCopyAction } from '../edit-copies-page/actionCreators';
import { getSelectedCountries } from '../common/helpers';


const LeftBtn = prevBtnFactory({ label: 'Edit image sources' });


function rightBtnValidator({ copies }) {
  const copiesKeys = Object.keys(copies);
  return copiesKeys.every(key => copies[key] !== '');
}


function dispatcher(dispatch, state) {
  dispatch(translateCopyAction({
    countries: getSelectedCountries(state.countries),
    copies: state.copies,
  }));
}


const RightBtn = nextBtnFactory({
  label: 'Edit copies by country',
  validator: rightBtnValidator,
  dispatcher,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
