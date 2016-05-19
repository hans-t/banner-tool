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
      const size = `${width}x${height}`;
      if (size in bySize) {
        bySize[size].push(bannerId);
      } else {
        bySize[size] = [bannerId];
      }
    });

  return (
    Object.keys(bySize).map(size => (
      <BannerList
        key={size}
        size={size}
        bannerIds={bySize[size]}
        {...props}
      />
    ))
  );
}


const styles = {
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
  <ContentScrollableContainer
    style={{
      ...styles.contentContainer,
      ...style,
    }}
  >
    {renderBannerListBySize(props)}
  </ContentScrollableContainer>
);

Results.propTypes = {
  country: React.PropTypes.string.isRequired,
  handleBannerClick: React.PropTypes.func.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  textsById: React.PropTypes.object.isRequired,
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
