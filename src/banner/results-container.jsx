import React from 'react';
import { connect } from 'react-redux';
import { combination } from 'js-combinatorics';


import Results from './results';
import { initBannerId } from '../add-images-page/actions';
import {
  updateCombinationsAction,
  removeBannerIdsAction,
} from '../banner/actionCreators';


function shouldCombinationsUpdate(oldImages, newImages) {
  /**
   * If new image object is added, we know that object is an empty string. Hence,
   * we don't update the combinations.
   * See: ADD_IMAGE action.
   */
  if (oldImages.length < newImages.length) {
    return false;
  }

  /**
   * Image deletion. Update the combinations.
   */
  if (oldImages.length > newImages.length) {
    return true;
  }

  /**
   * Don't update whenever there is some uninitialized image.
   */
  if (newImages.some(el => el === '')) {
    return false;
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


function getCombinations(templates, images) {
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
    const {
      ids,
      templates,
      updateCombinations,
      removeBannerIds,
      images,
    } = this.props;

    removeBannerIds(ids);
    updateCombinations(getCombinations(templates, images));
  }

  componentWillReceiveProps(nextProps) {
    const { images } = nextProps;
    if (shouldCombinationsUpdate(this.props.images, images)) {
      const { ids, templates } = nextProps;
      const { updateCombinations, removeBannerIds } = this.props;
      removeBannerIds(ids);
      updateCombinations(getCombinations(templates, images));
    }
  }

  render() {
    const {
      bannerIds,
      propsById,
      images,
      imageSetsById,
      currentPageNum,
      style,
    } = this.props;

    return (
      <Results
        bannerIds={bannerIds}
        propsById={propsById}
        images={images}
        imageSetsById={imageSetsById}
        currentPageNum={currentPageNum}
        style={style}
      />
    );
  }
}

ResultsContainer.propTypes = {
  images: React.PropTypes.array.isRequired,
  ids: React.PropTypes.array.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  updateCombinations: React.PropTypes.func.isRequired,
  removeBannerIds: React.PropTypes.func.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  propsById: React.PropTypes.object.isRequired,
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

  const bannerIds = bannerIdsByCountry[currentCountry];

  return {
    images: imagesByCountry[currentCountry],
    templates: getSelectedTemplates(templates),
    currentPageNum: pageNum,
    ids: bannerIds.map(el => el.id),
    imageSetsById,
    bannerIds,
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
    // setSelection: (index) => (
    //   dispatch(toggleBannerSelection(currentCountry, index))
    // ),
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    style: ownProps.style,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultsContainer);
