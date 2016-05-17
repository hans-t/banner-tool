import React from 'react';

import SaveBtn from './save-btn';
import { prevBtnFactory } from '../common/nav-btn';


const LeftBtn = prevBtnFactory({ label: 'Edit copies by country' });


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <SaveBtn />,
};
