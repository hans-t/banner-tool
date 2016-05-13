import React from 'react';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import ImageSourcesBox from './image-sources';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';


export default () => (
  <OuterContainer>
    <ContentScrollableContainer style={{ height: '95%', marginBottom: '1%' }}>
      <ImageSourcesBox />
    </ContentScrollableContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
