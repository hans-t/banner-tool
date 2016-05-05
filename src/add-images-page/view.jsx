import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import ImageSourcesBox from './image-sources';
import Bridge from './bridge';
import BannerResultsBox from '../banner/results';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <ImageSourcesBox style={{ height: '20%' }} />
      <Bridge style={{ height: '2%' }} />
      <BannerResultsBox style={{ height: '78%' }} />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
