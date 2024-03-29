import React from 'react';

import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


function validator({ textsByCountry }) {
  return Object.keys(textsByCountry)
    .every(country => {
      const copies = textsByCountry[country];
      const copiesKeys = Object.keys(copies);
      return copiesKeys.length > 0 && copiesKeys.every(key => copies[key].text !== '');
    });
}


const LeftBtn = prevBtnFactory({ label: 'Edit copies' });
const RightBtn = nextBtnFactory({ label: 'Edit banner settings', validator });


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
