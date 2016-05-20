import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import TextsBox from './texts-box';
import FontLoader from '../common/font-loader';


function loadFonts() {
  const styleSheet = Array
    .from(document.styleSheets)
    .find(el => el.href.indexOf('/fonts.css') !== -1);

  if (styleSheet) {
    return Array
      .from(styleSheet.rules)
      .map(rule => (
        <FontLoader fontFamily={rule.style.fontFamily} />
      ));
  } else {
    return false;
  }
}


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <TextsBox keyed />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
    {loadFonts()}
  </OuterContainer>
);
