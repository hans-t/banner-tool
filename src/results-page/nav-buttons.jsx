import React from 'react';

import SaveBtn from './save-btn';
import { prevBtnFactory } from '../common/nav-btn';


const LeftBtn = prevBtnFactory({ label: 'Edit banner settings' });


export default {
  leftBtn: <LeftBtn />,
  rightBtn: <SaveBtn />,
};
