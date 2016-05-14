import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const PrevBtn = prevBtnFactory({ label: 'Edit Sources' });
const NextBtn = nextBtnFactory({ label: 'Edit texts' });


export default {
  prevBtn: <PrevBtn />,
  nextBtn: <NextBtn />,
};
