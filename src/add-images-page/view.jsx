import React from 'react';

import CountryTabsContainer from '../common/country-tabs-container';
import OuterContainer from '../common/outer-container';
import ImageSourcesBox from './image-sources';
import Divider from 'material-ui/lib/divider';
import BannerResultsBox from '../banner/results-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';


export default () => (
  <OuterContainer>
    <CountryTabsContainer>
      <ImageSourcesBox style={{ height: '20%' }} />
      <Divider />
      <BannerResultsBox style={{ height: '80%' }} />
    </CountryTabsContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
