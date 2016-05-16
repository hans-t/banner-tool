import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


function validator({ textsByCountry }) {
  return Object.keys(textsByCountry)
    .every(country => {
      const copies = textsByCountry[country];
      const copiesKeys = Object.keys(copies);
      return copiesKeys.length > 0 && copiesKeys.every(key => copies[key]);
    });
}


const LeftBtn = prevBtnFactory({ label: 'Edit copies' });
const RightBtn = nextBtnFactory({
  label: 'See results',
  recombineOnClick: true,
  validator,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
