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


function recombiner({
  bannerIdsByCountry,
  imagesByCountry,
  textsByCountry,
  templates,
}) {
  let propsById = {};
  let textsById = {};
  let imageSetsById = {};
  const newBannerIdsByCountry = {};

  Object.keys(bannerIdsByCountry).forEach(country => {
    const existingBannerIds = bannerIdsByCountry[country];
    const images = imagesByCountry[country];
    newBannerIdsByCountry[country] = [];

    if (existingBannerIds.length > 0 && isAllImagesInitialized(images)) {
      const texts = textsByCountry[country];
      const combinations = getCombinations(images, templates, texts);
      newBannerIdsByCountry[country] = combinations.bannerIds;
      propsById = { ...propsById, ...combinations.propsById };
      textsById = { ...textsById, ...combinations.textsById };
      imageSetsById = { ...imageSetsById, ...combinations.imageSetsById };
    }
  });

  return {
    bannerIdsByCountry: newBannerIdsByCountry,
    imageSetsById,
    propsById,
    textsById,
  };
}


export function mapRecombinerStateToProps(state) {
  const { bannerIdsByCountry, textsByCountry, imagesByCountry, templates } = state;
  return {
    bannerIdsByCountry,
    textsByCountry,
    imagesByCountry,
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
