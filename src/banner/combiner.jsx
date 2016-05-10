import React from 'react';
import { combination } from 'js-combinatorics';

import { initBannerId } from '../add-images-page/actions';
import {
  addNewCombinationsAction,
  removeExistingCombinationsAction,
} from '../banner/actionCreators';

function setTexts(templateTexts, texts) {
  const textsObj = {};
  Object.keys(templateTexts).forEach(key => {
    textsObj[key] = {
      ...templateTexts[key],
      text: texts[key],
    };
  });
  return textsObj;
}


function getCombinations(images, templates, texts) {
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
    const templateTexts = template.texts;
    imageBoxes = template.imageBoxes;
    if (images.length >= imageBoxes.length) {
      const combinedImages = combination(images, imageBoxes.length);
      while (imageSet = combinedImages.next()) {  // eslint-disable-line no-cond-assign
        const bannerId = initBannerId({ index: bannerIds.length, pageNum: 1 });
        bannerIds.push(bannerId);

        const { id } = bannerId;
        imageSetsById[id] = imageSet.map(assignImageToBox);
        propsById[id] = template.props;
        textsById[id] = setTexts(templateTexts, texts);
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


/**
 * a convenient function that removes existing combinations and add new combinations in store
 */
export function combine({
  addNewCombinations,
  removeExistingCombinations,
  images,
  templates,
  texts,
}) {
  removeExistingCombinations();
  addNewCombinations(getCombinations(images, templates, texts));
}


export function mapCombinerStateToProps(state, ownProps) {
  const { currentCountry } = ownProps;
  const {
    textsByCountry,
    imagesByCountry,
    bannerIdsByCountry,
    templates,
  } = state;

  return {
    bannerIds: bannerIdsByCountry[currentCountry],
    images: imagesByCountry[currentCountry],
    templates: getSelectedTemplates(templates),
    texts: textsByCountry[currentCountry],
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
  const { removeExistingCombinations, ...dispatchers } = dispatchProps;
  return {
    ...stateProps,
    ...dispatchers,
    ...ownProps,
    removeExistingCombinations: () => removeExistingCombinations(bannerIds.map(el => el.id)),
  };
}


export const combinerPropTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  images: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  texts: React.PropTypes.object.isRequired,
  addNewCombinations: React.PropTypes.func.isRequired,
  removeExistingCombinations: React.PropTypes.func.isRequired,
};
