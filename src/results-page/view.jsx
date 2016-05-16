import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import BannerResultsBox from '../banner/results-container-2';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <BannerResultsBox style={{ height: '100%' }} />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
