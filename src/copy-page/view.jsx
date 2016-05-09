import React from 'react';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import CopyBox from './copy-box';


export default () => (
  <OuterContainer>
    <ContentScrollableContainer style={{ height: '95%', marginBottom: '1%' }}>
      <CopyBox />
    </ContentScrollableContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
