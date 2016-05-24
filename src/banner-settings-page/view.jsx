import React from 'react';

import OuterContainer from '../common/outer-container';
import ContentScrollableContainer from '../common/content-scrollable-container';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';
import SettingsBox from './settings-box';


export default () => (
  <OuterContainer>
    <ContentScrollableContainer style={{ height: '95%', marginBottom: '1%' }}>
      <SettingsBox />
    </ContentScrollableContainer>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
