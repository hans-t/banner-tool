import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import TextsBox from './texts-box';
import FontLoader from '../common/font-loader';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <TextsBox keyed />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
    <FontLoader fontFamily="Apercu" />
  </OuterContainer>
);
