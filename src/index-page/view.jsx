import React from 'react';

import ChannelSelectBox from './channel-select-box';
import CountriesSelectBox from './countries-select-box';
import TemplatesSelectBox from './templates-select-box';
import navButtons from './nav-buttons';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import NavBtnContainer from '../common/nav-btn-container';


const Content = () => {
  const style = {
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

  return (
    <ContentScrollableContainer style={style.container}>
      <ChannelSelectBox style={style.cell} />
      <CountriesSelectBox style={style.cell} />
      <TemplatesSelectBox style={style.cell} />
    </ContentScrollableContainer>
  );
};


export default () => (
  <OuterContainer>
    <Content />
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
