import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const LeftBtn = prevBtnFactory({ label: 'Index' });

const RightBtn = nextBtnFactory({
  label: 'Add Texts',
  validator: state => state.sources.every(el => el.url !== ''),
});


export default {
  prevBtn: <LeftBtn />,
  nextBtn: <RightBtn />,
};
