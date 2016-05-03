import React from 'react';
import { connect } from 'react-redux';

import BannerList from './list';
import ContentScrollableContainer from '../common/content-scrollable-container';


function renderBannerListBySize({ currentCountry, bannerIds, propsById }) {
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
        currentCountry={currentCountry}
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
        marginLeft: '2%',
        padding: '1% 1% 0',
        height: '100%',
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
  style: React.PropTypes.object,
  currentCountry: React.PropTypes.string,
  bannerIds: React.PropTypes.array,
  propsById: React.PropTypes.object,
};

BannerResults.defaultProps = {
  style: {},
};


export default connect(
  (state, ownProps) => ({
    bannerIds: state.bannerIdsByCountry[ownProps.currentCountry],
    propsById: state.propsById,
  })
)(BannerResults);
