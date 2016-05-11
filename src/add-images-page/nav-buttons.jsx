import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


const IndexBtn = prevBtnFactory({ label: 'Index' });

const AddTextsBtn = nextBtnFactory({ label: 'Add Texts' });

export default {
  prevBtn: <IndexBtn />,
  nextBtn: <AddTextsBtn />,
};
