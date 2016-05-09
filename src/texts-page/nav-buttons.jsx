import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const PrevBtn = prevBtnFactory('Edit Global Texts');
const NextBtn = nextBtnFactory('Results');


export default {
  prevBtn: <PrevBtn />,
  nextBtn: <NextBtn />,
};
