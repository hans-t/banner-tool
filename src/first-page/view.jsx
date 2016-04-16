import React from 'react';

import ChannelSelectBox from './channel-select-box';
import CountriesSelectBox from './countries-select-box';
import TemplatesSelectBox from './templates-select-box';
import AddImagesButton from './add-images-btn';
import {
  OuterContainer,
  ContentScrollableContainer,
} from '../common/containers';


const Content = () => {
  const style = {
    container: {
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
    <AddImagesButton />
  </OuterContainer>
);
