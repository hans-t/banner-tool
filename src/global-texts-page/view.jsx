import React from 'react';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import GlobalTextsBox from './global-texts-box';


export default () => (
  <OuterContainer>
    <ContentScrollableContainer style={{ height: '95%', marginBottom: '1%' }}>
      <GlobalTextsBox />
    </ContentScrollableContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
