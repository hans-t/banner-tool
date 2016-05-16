import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


function rightBtnValidator({ copies }) {
  const copiesKeys = Object.keys(copies);
  return copiesKeys.every(key => copies[key] !== '');
}


const LeftBtn = prevBtnFactory({ label: 'Edit image sources' });

const RightBtn = nextBtnFactory({
  label: 'Edit copies by country',
  validator: rightBtnValidator,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
