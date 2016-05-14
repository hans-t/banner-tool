import React from 'react';

import ContentScrollableContainer from '../common/content-scrollable-container';
import OuterContainer from '../common/outer-container';
import ImageSourcesBox from './image-sources';
import AddSourceBtn from './add-source-btn';
import NavBtnContainer from '../common/nav-btn-container';
import navButtons from './nav-buttons';


/**
 * We want the original location of <AddSourceBtn /> to be inside <ContentScrollableContainer />
 * but we want it to pop out of the container. However the container has overflow-y auto,
 * so any element that is outside of the container will be hidden.
 * The trick to solve this problem is to add wrapper div outside of the container,
 * and set the position of the wrapper, instead of the container, as relative.
 * This works since <AddSourceBtn/> has absolute position, it will be positioned with
 * respect to the closest positioned ancestor which in this case is the div wrapper.
 */


const styles = {
  wrapper: {
    position: 'relative',
    height: '95%',
    width: '100%',
    marginBottom: '1%',
  },
};


const DivWrapper = ({ children }) => (
  <div style={styles.wrapper}>{children}</div>
);

DivWrapper.propTypes = {
  children: React.PropTypes.node,
};


export default () => (
  <OuterContainer>
    <DivWrapper>
      <ContentScrollableContainer
        style={{
          height: '100%',
          padding: '26px 2% 0 2%',
          margin: 0,
        }}
      >
        <AddSourceBtn />
        <ImageSourcesBox />
      </ContentScrollableContainer>
    </DivWrapper>
    <NavBtnContainer {...navButtons} />
  </OuterContainer>
);
