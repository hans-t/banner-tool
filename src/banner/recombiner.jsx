import React from 'react';

import { getCombinations } from './combiner';
import { isAllImagesInitialized, getSelectedTemplates } from './helper';
import { replaceCombinationsAction } from '../banner/actionCreators';


function shouldRecombine({ templates }) {
  if (Object.keys(templates).length === 0) {
    return false;
  }
  return true;
}

/**
 * Gotta keep selection.
 * Recombiner is only on button click, so there won't be changes in
 * number of combinations for each banner size.
 * Number of combinations will always be equal before and after recombining except
 * when templates are added/removed. In that case, the combinations in each banner size
 * don't change.
 */
function recombiner({
  bannerIdsByCountry,
  imagesByCountry,
  textsByCountry,
  templates,
  propsById,
  imageSetsById,
}) {
  let newPropsById = {};
  let newTextsById = {};
  let newImageSetsById = {};
  const newBannerIdsByCountry = {};

  // creating bannerIdsLookup
  const bannerIdsLookupByCountry = {};
  Object.keys(bannerIdsByCountry).forEach(country => {
    const bannerIds = bannerIdsByCountry[country];
    const bannerIdsLookup = bannerIdsLookupByCountry[country] = {};
    bannerIds.forEach(bannerId => {
      const { id } = bannerId;
      const templateName = propsById[id].templateName;
      const imageSetIndices = imageSetsById[id]
        .map(el => el.index)
        .join(',');
      const key = `${imageSetIndices},${templateName}`;
      bannerIdsLookup[key] = {
        selected: bannerId.selected,
        visibleOnPageNum: bannerId.visibleOnPageNum, // this is wrong, why keep +1?
      };
    });
  });

  Object.keys(bannerIdsByCountry).forEach(country => {
    const existingBannerIds = bannerIdsByCountry[country];
    const images = imagesByCountry[country];
    newBannerIdsByCountry[country] = [];

    if (existingBannerIds.length > 0 && isAllImagesInitialized(images)) {
      const texts = textsByCountry[country];
      const combinations = getCombinations(images, templates, texts);
      const newBannerIds = combinations.bannerIds;
      newPropsById = { ...newPropsById, ...combinations.propsById };
      newTextsById = { ...newTextsById, ...combinations.textsById };
      newImageSetsById = { ...newImageSetsById, ...combinations.imageSetsById };
      newBannerIdsByCountry[country] = newBannerIds.map(bannerId => {
        const { id } = bannerId;
        const templateName = combinations.propsById[id].templateName;
        const imageSetIndices = combinations.imageSetsById[id]
          .map(el => el.index)
          .join(',');
        const key = `${imageSetIndices},${templateName}`;
        return {
          ...bannerId,
          ...bannerIdsLookupByCountry[country][key],
        };
      });
    }
  });

  return {
    bannerIdsByCountry: newBannerIdsByCountry,
    imageSetsById: newImageSetsById,
    propsById: newPropsById,
    textsById: newTextsById,
  };
}


export function mapRecombinerStateToProps({
  bannerIdsByCountry,
  textsByCountry,
  imagesByCountry,
  templates,
  propsById,
  imageSetsById,
}) {
  return {
    bannerIdsByCountry,
    textsByCountry,
    imagesByCountry,
    propsById,
    imageSetsById,
    templates: getSelectedTemplates(templates),
  };
}


export function mapRecombinerDispatchProps(dispatch) {
  return {
    replaceCombinations: (combinations) => (
      dispatch(replaceCombinationsAction(combinations))
    ),
  };
}


export function mergeRecombinerProps(stateProps, dispatchProps) {
  return {
    recombine: () => {
      if (shouldRecombine(stateProps)) {
        dispatchProps.replaceCombinations(recombiner(stateProps));
      }
    },
  };
}


export const recombinerPropTypes = {
  recombine: React.PropTypes.func.isRequired,
};
