import React from 'react';

import ChannelSelectBox from './channel-select-box';
import CountriesSelectBox from './countries-select-box';
import TemplatesSelectBox from './templates-select-box';
import navButtons from './nav-buttons';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';


const styles = {
  container: {
    height: '95%',
    marginBottom: '1%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    marginLeft: '2%',
    marginRight: '2%',

    // magic flexbox
    flex: 1,
  },
};


const Content = () => (
  <ContentScrollableContainer style={styles.container}>
    <ChannelSelectBox style={styles.cell} />
    <CountriesSelectBox style={styles.cell} />
    <TemplatesSelectBox style={styles.cell} />
  </ContentScrollableContainer>
);


export default () => (
  <OuterContainer>
    <Content />
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
