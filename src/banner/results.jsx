import React from 'react';

import BannerList from './list';
import ContentScrollableContainer from '../common/content-scrollable-container';


function renderBannerListBySize({ bannerIds, currentPageNum, ...props }) {
  const { propsById } = props;
  const bySize = {};
  bannerIds
    .filter(bannerId => bannerId.visibleOnPageNum >= currentPageNum)
    .forEach(bannerId => {
      const { width, height } = propsById[bannerId.id];
      const sizeStr = `${width}x${height}`;
      if (sizeStr in bySize) {
        bySize[sizeStr].push(bannerId);
      } else {
        bySize[sizeStr] = [bannerId];
      }
    });

  return (
    Object.keys(bySize).map(sizeStr => (
      <BannerList
        key={sizeStr}
        sizeStr={sizeStr}
        bannerIds={bySize[sizeStr]}
        {...props}
      />
    ))
  );
}


const defaultStyle = {
  contentContainer: {
    padding: '1% 1% 0',
    height: '100%',
    marginBottom: 0,
    backgroundColor: '#EEEEEE',
  },
};


/**
 * Presentational component. This component will update whenever there are changes
 * to image combinations or the images.
 */
const Results = ({ style, ...props }) => (
  <ContentScrollableContainer style={{ ...defaultStyle.contentContainer, ...style }}>
    {renderBannerListBySize(props)}
  </ContentScrollableContainer>
);

Results.propTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
  currentPageNum: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
};

Results.defaultProps = {
  style: {},
};

export default Results;
