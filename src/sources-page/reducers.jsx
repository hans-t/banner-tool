import {
  ADD_SOURCE,
  EDIT_SOURCE,
  REMOVE_SOURCE,
  COPY_SOURCES,
  sourceFactory,
} from './actions';

import {
  groupReducerByCountry,
  addToArray,
  removeFromArray,
  replaceValueInArray,
} from '../common/helpers';


const DEFAULT_NUMBER_OF_SOURCES = 6;

const getDefaultSourcesState = () => Array(DEFAULT_NUMBER_OF_SOURCES)
  .fill('')
  .map(sourceFactory);


const getDefaultImagesState = () => Array(DEFAULT_NUMBER_OF_SOURCES)
  .fill('');


/**
 * State is an array of objects, where each contains the following information,
 * about a source URL input:
 * @param {string} id: Unique ID as key for React.
 * @param {string} url: Zalora product page.
 * @param {number} imageNumber: Which image that the user want in product page.
 * 1 is the first image.
 */
export function sources(state = getDefaultSourcesState(), action) {
  const { index, values } = action;
  switch (action.type) {
    case ADD_SOURCE:
      return addToArray(state, sourceFactory());

    case EDIT_SOURCE:
      return replaceValueInArray(state, index, values);

    case REMOVE_SOURCE: {
      if (state.length > 1) {
        return removeFromArray(state, index);
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}


/**
 * Images state is an array of image objects, where each contains
 * the following information about an image:
 * @param {number} index: Index of object in the container array.
 * @param {string} image: img element.
 * @param {number} width: width of the image.
 * @param {number} height: height of the image.
 */
export function images(state = getDefaultImagesState(), action) {
  const { type, index, image } = action;
  switch (type) {
    case ADD_SOURCE:
      return addToArray(state, '');

    case EDIT_SOURCE:
      return replaceValueInArray(state, index, image);

    case REMOVE_SOURCE:
      return removeFromArray(state, index);

    default:
      return state;
  }
}


export const sourcesByCountry = groupReducerByCountry(
  sources,
  getDefaultSourcesState,
  (state, action) => {
    switch (action.type) {
      case COPY_SOURCES:
        return Object.keys(state).reduce((obj, country) => ({
          ...obj,
          [country]: action.sources,
        }), {});

      default:
        return Object.keys(state).reduce((obj, country) => ({
          ...obj,
          [country]: sources(state[country], action),
        }), {});
    }
  }
);


export const imagesByCountry = groupReducerByCountry(
  images,
  getDefaultImagesState,
  (state, action) => {
    switch (action.type) {
      case COPY_SOURCES:
        return Object.keys(state).reduce((obj, country) => ({
          ...obj,
          [country]: action.images,
        }), {});

      default:
        return Object.keys(state).reduce((obj, country) => ({
          ...obj,
          [country]: images(state[country], action),
        }), {});
    }
  }
);
