import {
  ADD_SOURCE_URL,
  EDIT_SOURCE_URL,
  REMOVE_SOURCE_URL,
  sourceURLFactory,
  initSourceURL,
  initImages,
} from './actions';

import {
  groupReducerByCountry,
  addToArray,
  removeFromArray,
  replaceValueInArray,
} from '../common/helpers';


/**
 * State is an array of objects, where each contains the following information,
 * about a source URL input:
 * @param {string} id: Unique ID as key for React.
 * @param {string} url: Zalora product page.
 * @param {number} imageNumber: Which image that the user want in product page.
 * 1 is the first image.
 */
function sourceURLs(state = [], action) {
  const { index, values } = action;

  switch (action.type) {
    case ADD_SOURCE_URL:
      return addToArray(state, sourceURLFactory());

    case EDIT_SOURCE_URL:
      return replaceValueInArray(state, index, values);

    case REMOVE_SOURCE_URL: {
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
function images(state = [], action) {
  const { type, index, image } = action;
  switch (type) {
    case ADD_SOURCE_URL:
      return addToArray(state, '');

    case EDIT_SOURCE_URL:
      return replaceValueInArray(state, index, image);

    case REMOVE_SOURCE_URL:
      return removeFromArray(state, index);

    default:
      return state;
  }
}


export const sourceURLsByCountry = groupReducerByCountry(sourceURLs, initSourceURL);
export const imagesByCountry = groupReducerByCountry(images, initImages);
