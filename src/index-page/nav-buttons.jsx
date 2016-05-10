import React from 'react';

import { getSelectedTemplates } from '../banner/helper';
import { getSelectedCountries } from '../common/helpers';
import { nextBtnWithRecombineFactory } from '../common/nav-btn';


function validator({ templates, countries }) {
  const selectedTemplates = getSelectedTemplates(templates);
  const selectedCountries = getSelectedCountries(countries);

  if (selectedTemplates.length > 0 && selectedCountries.length > 0) {
    return true;
  }

  return false;
}


const NextBtn = nextBtnWithRecombineFactory({ label: 'Add Images', validator });


export default {
  nextBtn: <NextBtn />,
};
