import React from 'react';
import { connect } from 'react-redux';

import BannerList from './list';
import ContentScrollableContainer from '../common/content-scrollable-container';


function renderBannerListBySize({ images, bannerIds, propsById }) {
  const bySize = {};
  bannerIds.forEach(obj => {
    const id = obj.id;
    const { width, height } = propsById[id];
    const sizeStr = `${width}x${height}`;
    if (sizeStr in bySize) {
      bySize[sizeStr].push(id);
    } else {
      bySize[sizeStr] = [id];
    }
  });

  return (
    Object.keys(bySize).map(sizeStr => (
      <BannerList
        key={sizeStr}
        sizeStr={sizeStr}
        bannerIds={bySize[sizeStr]}
        propsById={propsById}
        images={images}
      />
    ))
  );
}


class BannerResults extends React.Component {
  constructor(props) {
    super(props);
    this.defaultStyle = {
      container: {
        position: 'relative',
      },
      contentContainer: {
        padding: '1% 1% 0',
        height: '100%',
        marginBottom: 0,
        backgroundColor: '#EEEEEE',
      },
    };
  }

  render() {
    return (
      <div style={{ ...this.defaultStyle.container, ...this.props.style }}>
        <ContentScrollableContainer style={this.defaultStyle.contentContainer}>
          {renderBannerListBySize(this.props)}
        </ContentScrollableContainer>
      </div>
    );
  }
}

BannerResults.propTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

BannerResults.defaultProps = {
  style: {},
};


export default connect(
  (state, ownProps) => {
    const { bannerIdsByCountry, propsById, imagesByCountry } = state;
    const { currentCountry } = ownProps;
    return {
      bannerIds: bannerIdsByCountry[currentCountry],
      images: imagesByCountry[currentCountry],
      propsById,
    };
  },
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    style: ownProps.style,
  })
)(BannerResults);
