import React from 'react';

import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';
import { replaceCombinationsAction } from '../banner/actionCreators';
import combine from '../banner/combiner';


function validator({ textsByCountry }) {
  return Object.keys(textsByCountry)
    .every(country => {
      const copies = textsByCountry[country];
      const copiesKeys = Object.keys(copies);
      return copiesKeys.length > 0 && copiesKeys.every(key => copies[key].text !== '');
    });
}


function dispatcher(dispatch, state) {
  // wants to show the banners on next page, so we add 1 to current page number.
  dispatch(replaceCombinationsAction(combine({
    ...state,
    pageNum: state.pageNum + 1,
  })));
}


const LeftBtn = prevBtnFactory({ label: 'Edit banner settings' });
const RightBtn = nextBtnFactory({
  label: 'See results',
  validator,
  dispatcher,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
