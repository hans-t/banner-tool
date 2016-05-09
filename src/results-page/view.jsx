import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import BannerResults from '../banner/results';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <BannerResults style={{ height: '100%' }} />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
