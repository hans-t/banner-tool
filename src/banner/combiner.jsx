import React from 'react';
import { combination } from 'js-combinatorics';

import { initBannerId } from './initializer';
import { getSelectedTemplates } from './helper';
import {
  addNewCombinationsAction,
  removeExistingCombinationsAction,
} from '../banner/actionCreators';


function setTexts(templateTexts, texts) {
  const textsObj = {};
  Object.keys(templateTexts).forEach(key => {
    textsObj[key] = {
      ...templateTexts[key],
      text: texts[key] || '',
    };
  });
  return textsObj;
}


export function getCombinations({ images, templates, texts, currentPageNum }) {
  let imageBoxes;
  const imageSetsById = {};
  const bannerIds = [];
  const propsById = {};
  const textsById = {};

  const assignImageToBox = (image, imageSetIndex) => ({
    ...imageBoxes[imageSetIndex],
    index: image.index,
  });

  templates.forEach(template => {
    let imageSet;
    const templateTexts = template.texts;
    imageBoxes = template.imageBoxes;
    if (images.length >= imageBoxes.length) {
      const combinedImages = combination(images, imageBoxes.length);
      while (imageSet = combinedImages.next()) {  // eslint-disable-line no-cond-assign
        const bannerId = initBannerId({
          index: bannerIds.length,
          pageNum: currentPageNum,
        });

        const { id } = bannerId;
        bannerIds.push(bannerId);
        imageSetsById[id] = imageSet.map(assignImageToBox);
        propsById[id] = template.props;
        textsById[id] = setTexts(templateTexts, texts);
      }
    }
  });
  return { bannerIds, imageSetsById, propsById, textsById };
}


export function mapCombinerStateToProps(state, ownProps) {
  const { currentCountry } = ownProps;
  const {
    textsByCountry,
    imagesByCountry,
    bannerIdsByCountry,
    templates,
    pageNum,
  } = state;

  return {
    bannerIds: bannerIdsByCountry[currentCountry],
    images: imagesByCountry[currentCountry],
    templates: getSelectedTemplates(templates),
    texts: textsByCountry[currentCountry],
    currentPageNum: pageNum,
  };
}


export function mapCombinerDispatchProps(dispatch, ownProps) {
  const { currentCountry } = ownProps;
  return {
    addNewCombinations: (combinations) => (
      dispatch(addNewCombinationsAction(currentCountry, combinations))
    ),
    removeExistingCombinations: (bannerIds) => (
      dispatch(removeExistingCombinationsAction(currentCountry, bannerIds))
    ),
  };
}


export function mergeCombinerProps(stateProps, dispatchProps, ownProps) {
  const { bannerIds } = stateProps;
  const { removeExistingCombinations, addNewCombinations } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    combine: () => {
      removeExistingCombinations(bannerIds.map(el => el.id));
      addNewCombinations(getCombinations(stateProps));
    },
  };
}


export const combinerPropTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  images: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  texts: React.PropTypes.object.isRequired,
  combine: React.PropTypes.func.isRequired,
};
