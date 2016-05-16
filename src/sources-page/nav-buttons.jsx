import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


function rightBtnValidator({ sources }) {
  return sources.every(el => el.url !== '');
}


const LeftBtn = prevBtnFactory({ label: 'Home' });

const RightBtn = nextBtnFactory({
  label: 'Add copies',
  validator: rightBtnValidator,
});


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <RightBtn />,
};
