import React from 'react';
import { connect } from 'react-redux';

import BannerList from './list';
import ContentScrollableContainer from '../common/content-scrollable-container';
import { toggleBannerSelection } from './actionCreators';


function renderBannerListBySize({ bannerIds, ...props }) {
  const { propsById } = props;
  const bySize = {};
  bannerIds
    .filter(bannerId => bannerId.visible)
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
  setSelection: React.PropTypes.func.isRequired,
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
  (dispatch, ownProps) => {
    const { currentCountry } = ownProps;
    return {
      setSelection: (index) => dispatch(toggleBannerSelection(currentCountry, index)),
    };
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    style: ownProps.style,
  })
)(BannerResults);
