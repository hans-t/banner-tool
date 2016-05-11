import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const PrevBtn = prevBtnFactory({ label: 'Add Images', recombineOnClick: true });
const NextBtn = nextBtnFactory({ label: 'Edit texts' });


export default {
  prevBtn: <PrevBtn />,
  nextBtn: <NextBtn />,
};
