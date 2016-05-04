import { generate as generateId } from 'shortid';
import {
  groupReducerByCountry,
  addToArray,
  removeFromArray,
  replaceValueInArray,
} from '../common/helpers';


const INITIAL_NUMBER_OF_SOURCE_URLS = 6;


const defaultSourceURLValues = {
  url: 'https://www.zalora.',
  imageNumber: 1,
};


const defaultSourceURLValuesFactory = () => ({ ...defaultSourceURLValues, id: generateId() });


const initialSourceURLStateFactory = () => (
  Array(INITIAL_NUMBER_OF_SOURCE_URLS)
    .fill('')
    .map(defaultSourceURLValuesFactory)
);

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
    case 'ADD_SOURCE_URL':
      return addToArray(state, defaultSourceURLValuesFactory());

    case 'EDIT_SOURCE_URL':
      return replaceValueInArray(state, index, values);

    case 'REMOVE_SOURCE_URL': {
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
 * Initialize images with empty string.
 * The number of default images is the same as the number of source URLs.
 */
const initialImagesStateFactory = () => (
  Array(INITIAL_NUMBER_OF_SOURCE_URLS)
    .fill('')
);


/**
 * Images state is an array of image objects, where each contains
 * the following information about an image:
 * @param {number} index: Index of object in the container array.
 * @param {string} dataURI: base 64 encoded image data.
 * @param {number} width: width of the image.
 * @param {number} height: height of the image.
 */
function images(state = [], action) {
  const { type, index, image } = action;
  switch (type) {
    case 'ADD_IMAGE':
      return addToArray(state, '');

    case 'REPLACE_IMAGE':
      return replaceValueInArray(state, index, image);

    case 'REMOVE_IMAGE':
      return removeFromArray(state, index);

    default:
      return state;
  }
}


export const imagesByCountry = groupReducerByCountry(images, initialImagesStateFactory);
export const sourceURLsByCountry = groupReducerByCountry(sourceURLs, initialSourceURLStateFactory);
