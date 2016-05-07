import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { combination } from 'js-combinatorics';

import { initBannerId } from './actions';
import { bindCountryToDispatchProps } from '../common/helpers';
import * as actionCreators from '../banner/actionCreators';


const textsKeys = ['headline', 'title', 'copy1', 'copy2', 'copy3'];


function isImagesReady(images) {
  return images.every(el => el !== '');
}


function isArrayEqual(arr1, arr2) {
  return arr1.every((el, idx) => el === arr2[idx]);
}


function cloneInsideObjects(obj, keys) {
  const clonedObj = {};
  keys.forEach(key => {
    if (key in obj) {
      clonedObj[key] = { ...obj[key] };
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
    const combinedImages = combination(images, imageBoxes.length);

    while (imageSet = combinedImages.next()) {  // eslint-disable-line no-cond-assign
      const bannerId = initBannerId({ index: bannerIds.length, pageNum: 1 });
      bannerIds.push(bannerId);

      const { id } = bannerId;
      imageSetsById[id] = imageSet.map(assignImageToBox);
      propsById[id] = template.props;
      textsById[id] = cloneInsideObjects(template.texts, textsKeys);
    }
  });
  return { bannerIds, imageSetsById, propsById, textsById };
}


function getSelectedTemplates(templates) {
  return Object.keys(templates)
    .map(name => templates[name])
    .filter(template => template.selected);
}


class Bridge extends React.Component {
  /**
   * If only image value change, we don't need to re-compute the combinations, because
   * image is referred in the combinations by index. We only need to re-render banner results.
   * But if number of sources changes, we need to re-compute combinations and also
   * re-render banner results.
   *
   * But can we remove Bridge?
   */
  componentWillReceiveProps(nextProps) {
    const {
      bannerIds,
      templates,
      images,
      removeBannerIds,
      updateCombinations,
    } = nextProps;

    // When images change and have non-empty dataURIs.
    if (!isArrayEqual(images, this.props.images) && isImagesReady(images)) {
      removeBannerIds(bannerIds);
      const combinations = getCombinations(templates, images);
      updateCombinations(combinations);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <span style={this.props.style} />;
  }
}

Bridge.propTypes = {
  currentCountry: React.PropTypes.string.isRequired,
  images: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  updateCombinations: React.PropTypes.func.isRequired,
  removeBannerIds: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};

Bridge.defaultProps = {
  style: {},
};


function mapStateToProps(state, ownProps) {
  const { currentCountry } = ownProps;
  return {
    images: state.imagesByCountry[currentCountry],
    bannerIds: state.bannerIdsByCountry[currentCountry].map(el => el.id),
    templates: getSelectedTemplates(state.templates),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  const { currentCountry } = ownProps;
  const boundDispatchProps = bindCountryToDispatchProps(dispatchProps, currentCountry);
  return {
    ...stateProps,
    ...boundDispatchProps,
    ...ownProps,
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Bridge);
