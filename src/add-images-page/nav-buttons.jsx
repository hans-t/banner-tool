import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const IndexBtn = prevBtnFactory('Index');

const AddTextsBtn = nextBtnFactory('Add Texts');

export default {
  prevBtn: <IndexBtn />,
  nextBtn: <AddTextsBtn />,
};
