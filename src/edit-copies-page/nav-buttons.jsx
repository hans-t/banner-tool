import React from 'react';

import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn-2';
import { replaceCombinationsAction } from '../banner/actionCreators';
import combine from '../banner/combiner-2';


function validator({ textsByCountry }) {
  return Object.keys(textsByCountry)
    .every(country => {
      const copies = textsByCountry[country];
      const copiesKeys = Object.keys(copies);
      return copiesKeys.length > 0 && copiesKeys.every(key => copies[key]);
    });
}


function dispatcher(dispatch, state) {
  dispatch(replaceCombinationsAction(combine({
    ...state,
    pageNum: state.pageNum + 1,
  })));
}


const LeftBtn = prevBtnFactory({ label: 'Edit copies' });
const RightBtn = nextBtnFactory({
  label: 'See results',
  validator,
  dispatcher,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
