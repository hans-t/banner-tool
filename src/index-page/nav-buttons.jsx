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


const NextBtn = nextBtnFactory({
  label: 'Add Images',
  recombineOnClick: true,
  validator,
});


export default {
  nextBtn: <NextBtn />,
};
