import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import TextsBox from './texts-box';
import BannerResults from '../banner/results';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <TextsBox style={{ height: '20%'}} />
      <BannerResults style={{ height: '80%' }} />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
