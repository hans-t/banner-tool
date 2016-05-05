import React from 'react';

import TabbedOuterContainer from '../common/tabbed-outer-container';
import ImageSourcesBox from './image-sources';
import Bridge from './bridge';
import BannerResultsBox from '../banner/results';


export default () => (
  <TabbedOuterContainer>
    <ImageSourcesBox style={{ height: '20%' }} />
    <Bridge style={{ height: '2%' }} />
    <BannerResultsBox style={{ height: '78%' }} />
  </TabbedOuterContainer>
);
