import React from 'react';

import { getSelectedTemplates } from '../banner/helper';
import { getSelectedCountries } from '../common/helpers';
import { nextBtnFactory } from '../common/nav-btn';


function validator({ templates, countries }) {
  const selectedTemplates = getSelectedTemplates(templates);
  const selectedCountries = getSelectedCountries(countries);

  if (selectedTemplates.length > 0 && selectedCountries.length > 0) {
    return true;
  }

  return false;
}


const RightBtn = nextBtnFactory({
  label: 'Add image sources',
  validator,
});


export default {
  rightBtn: <RightBtn />,
};
