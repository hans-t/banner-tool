import React from 'react';
import { connect } from 'react-redux';

import Results from './results';
import { toggleBannerSelection } from '../banner/actionCreators';
import { isAllImagesInitialized } from './helper';
import {
  combinerPropTypes,
  mapCombinerStateToProps,
  mapCombinerDispatchProps,
  mergeCombinerProps,
} from './combiner';


function shouldCombineOnMount({ images, templates, bannerIds }) {
  /**
   * Check necessary conditions for combine:
   */
  if (!isAllImagesInitialized(images)) {
    return false;
  }

  if (Object.keys(templates).length === 0) {
    return false;
  }

  /**
   * Don't combine when there are existing combinations
   */
  if (bannerIds.length > 0) {
    return false;
  }

  return true;
}


function shouldCombinationsUpdate(prevProps, nextProps) {
  /**
   * Compute combinations only if there is no change in country value.
   * Otherwise, render what is in store.
   */
  if (prevProps.currentCountry !== nextProps.currentCountry) {
    return false;
  }

  /**
   * We don't need to check whether templates is empty because template selection
   * is not in the same page as banner results.
   */

  const oldImages = prevProps.images;
  const newImages = nextProps.images;

  /**
   * If new image object is added, we know that object is an empty string. Hence,
   * we don't update the combinations.
   * See: ADD_IMAGE action.
   */
  if (oldImages.length < newImages.length) {
    return false;
  }

  /**
   * Don't update whenever there is some uninitialized image.
   */
  if (!isAllImagesInitialized(newImages)) {
    return false;
  }

  /**
   * Image deletion. Update the combinations.
   */
  if (oldImages.length > newImages.length) {
    return true;
  }

  /**
   * When both oldImages and newImages have equal length.
   * Update when there is an image that changes.
   */
  return oldImages.some((oldImage, idx) => oldImage.id !== newImages[idx].id);
}


class ResultsContainer extends React.Component {
  componentDidMount() {
    if (shouldCombineOnMount(this.props)) {
      this.props.combine();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (shouldCombinationsUpdate(this.props, nextProps)) {
      nextProps.combine();
    }
  }

  render() {
    const {
      bannerIds,
      propsById,
      textsById,
      images,
      imageSetsById,
      currentPageNum,
      handleBannerClick,
      style,
    } = this.props;

    return (
      <Results
        bannerIds={bannerIds}
        propsById={propsById}
        textsById={textsById}
        images={images}
        imageSetsById={imageSetsById}
        currentPageNum={currentPageNum}
        handleBannerClick={handleBannerClick}
        style={style}
      />
    );
  }
}

ResultsContainer.propTypes = {
  ...combinerPropTypes,
  propsById: React.PropTypes.object.isRequired,
  textsById: React.PropTypes.object.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
  currentPageNum: React.PropTypes.number.isRequired,
  handleBannerClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};


function mapStateToProps(state, ownProps) {
  const {
    imageSetsById,
    propsById,
    textsById,
    pageNum,
  } = state;
  return {
    ...mapCombinerStateToProps(state, ownProps),
    currentPageNum: pageNum,
    imageSetsById,
    propsById,
    textsById,
  };
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  ...mapCombinerDispatchProps(dispatch, ownProps),
  handleBannerClick: (currentPageNum, index) => (
    dispatch(toggleBannerSelection({
      country: ownProps.currentCountry,
      index,
      currentPageNum,
    }))
  ),
});


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { currentPageNum } = stateProps;
  const { handleBannerClick } = dispatchProps;
  return {
    ...mergeCombinerProps(stateProps, dispatchProps, ownProps),
    handleBannerClick: index => handleBannerClick(currentPageNum, index),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultsContainer);
