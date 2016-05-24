import { combination } from 'js-combinatorics';

import { initBannerId } from './initializer';
import { getSelectedTemplates } from './helper';


function setTexts(templateTexts, texts) {
  return Object.keys(templateTexts).reduce((obj, key) => ({
    ...obj,
    [key]: {
      ...templateTexts[key],
      text: texts[key].text || '',
      fillStyle: texts[key].color,
    },
  }), {});
}


/**
 * Compute combinations for a country.
 */
function combine({ images, templates, texts, pageNum }) {
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
        const bannerId = initBannerId({ index: bannerIds.length, pageNum });
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


/**
 * Compute combinations for all countries.
 */
export default function combineAll({
  imagesByCountry,
  textsByCountry,
  templates,
  pageNum,
}) {
  const bannerIdsByCountry = {};
  let imageSetsById = {};
  let propsById = {};
  let textsById = {};
  const selectedTemplates = getSelectedTemplates(templates);

  Object.keys(imagesByCountry).forEach(country => {
    const images = imagesByCountry[country];
    const texts = textsByCountry[country];
    const combinations = combine({
      images,
      texts,
      pageNum,
      templates: selectedTemplates,
    });

    bannerIdsByCountry[country] = combinations.bannerIds;
    propsById = { ...propsById, ...combinations.propsById };
    textsById = { ...textsById, ...combinations.textsById };
    imageSetsById = { ...imageSetsById, ...combinations.imageSetsById };
  });

  return {
    bannerIdsByCountry,
    imageSetsById,
    propsById,
    textsById,
  };
}
