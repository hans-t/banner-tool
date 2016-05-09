import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const PrevBtn = prevBtnFactory('Add Images');
const NextBtn = nextBtnFactory('Edit texts');


export default {
  prevBtn: <PrevBtn />,
  nextBtn: <NextBtn />,
};
