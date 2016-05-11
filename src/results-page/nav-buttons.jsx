import React from 'react';
import { prevBtnFactory } from '../common/nav-btn';


const PrevBtn = prevBtnFactory({ label: 'Add Texts' });


export default {
  prevBtn: <PrevBtn />,
};
