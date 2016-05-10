import React from 'react';
import { connect } from 'react-redux';
import { combination } from 'js-combinatorics';


import Results from './results';
import { initBannerId } from '../add-images-page/actions';
import {
  updateCombinationsAction,
  removeBannerIdsAction,
  toggleBannerSelection,
} from '../banner/actionCreators';


function isAllImagesInitialized(images) {
  return images.every(image => image.hasOwnProperty('image'));
}


function shouldCombineOnMount({ images, templates, bannerIds }) {
  if (!isAllImagesInitialized(images)) {
    return false;
  }

  if (Object.keys(templates).length === 0) {
    return false;
  }

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


function cloneTexts(texts) {
  const clonedObj = {};
  const keys = ['headline', 'title', 'copy1', 'copy2', 'copy3'];
  keys.forEach(key => {
    if (key in texts) {
      clonedObj[key] = { ...texts[key] };
    }
  });
  return clonedObj;
}


function getCombinations(images, templates) {
  let imageBoxes;
  const imageSetsById = {};
  const bannerIds = [];
  const propsById = [];
  const textsById = [];

  const assignImageToBox = (image, imageSetIndex) => ({
    ...imageBoxes[imageSetIndex],
    index: image.index,
  });

  templates.forEach(template => {
    let imageSet;
    imageBoxes = template.imageBoxes;
    if (images.length >= imageBoxes.length) {
      const combinedImages = combination(images, imageBoxes.length);
      while (imageSet = combinedImages.next()) {  // eslint-disable-line no-cond-assign
        const bannerId = initBannerId({ index: bannerIds.length, pageNum: 1 });
        bannerIds.push(bannerId);

        const { id } = bannerId;
        imageSetsById[id] = imageSet.map(assignImageToBox);
        propsById[id] = template.props;
        textsById[id] = cloneTexts(template.texts);
      }
    }
  });
  return { bannerIds, imageSetsById, propsById, textsById };
}


function getSelectedTemplates(templates) {
  return Object.keys(templates)
    .map(name => templates[name])
    .filter(template => template.selected);
}


class ResultsContainer extends React.Component {
  componentDidMount() {
    if (shouldCombineOnMount(this.props)) {
      const { updateCombinations, removeBannerIds, images, templates } = this.props;
      removeBannerIds();
      updateCombinations(getCombinations(images, templates));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (shouldCombinationsUpdate(this.props, nextProps)) {
      const { updateCombinations, removeBannerIds, images, templates } = nextProps;
      removeBannerIds();
      updateCombinations(getCombinations(images, templates));
    }
  }

  render() {
    const {
      bannerIds,
      propsById,
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
  images: React.PropTypes.array.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  updateCombinations: React.PropTypes.func.isRequired,
  handleBannerClick: React.PropTypes.func.isRequired,
  removeBannerIds: React.PropTypes.func.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  propsById: React.PropTypes.object.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
  currentPageNum: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
};


function mapStateToProps(state, ownProps) {
  const { currentCountry } = ownProps;
  const {
    imagesByCountry,
    bannerIdsByCountry,
    propsById,
    pageNum,
    templates,
    imageSetsById,
  } = state;

  return {
    images: imagesByCountry[currentCountry],
    bannerIds: bannerIdsByCountry[currentCountry],
    templates: getSelectedTemplates(templates),
    currentPageNum: pageNum,
    imageSetsById,
    propsById,
  };
}


function mapDispatchToProps(dispatch, ownProps) {
  const { currentCountry } = ownProps;
  return {
    updateCombinations: (combinations) => (
      dispatch(updateCombinationsAction(currentCountry, combinations))
    ),
    removeBannerIds: (bannerIds) => (
      dispatch(removeBannerIdsAction(currentCountry, bannerIds))
    ),
    handleBannerClick: (index) => (
      dispatch(toggleBannerSelection(currentCountry, index))
    ),
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  const { bannerIds } = stateProps;
  const { removeBannerIds, ...dispatchers } = dispatchProps;
  return {
    ...stateProps,
    ...dispatchers,
    ...ownProps,
    removeBannerIds: () => removeBannerIds(bannerIds.map(el => el.id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultsContainer);
