import React from 'react';
import { nextBtnFactory } from '../common/nav-btn';


const RightBtn = nextBtnFactory({ label: 'Edit Sources' });

export default {
  nextBtn: <RightBtn />,
};
