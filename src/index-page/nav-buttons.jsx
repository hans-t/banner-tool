import React from 'react';

import { getSelectedTemplates } from '../banner/helper';
import { getSelectedCountries } from '../common/helpers';
import { nextBtnFactory } from '../common/nav-btn';
import { copySources } from '../sources-page/actionCreators';


function validator({ templates, countries }) {
  const selectedTemplates = getSelectedTemplates(templates);
  const selectedCountries = getSelectedCountries(countries);

  if (selectedTemplates.length > 0 && selectedCountries.length > 0) {
    return true;
  }

  return false;
}


function dispatcher(dispatch, state) {
  dispatch(copySources(state));
}


const RightBtn = nextBtnFactory({
  label: 'Add image sources',
  validator,
  dispatcher,
});


export default {
  rightBtn: <RightBtn />,
};
