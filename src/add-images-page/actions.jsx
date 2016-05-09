import { generate as generateId } from 'shortid';


/**
 * Action types:
 */
export const ADD_SOURCE_URL = 'ADD_SOURCE_URL';

export const EDIT_SOURCE_URL = 'EDIT_SOURCE_URL';

export const REMOVE_SOURCE_URL = 'REMOVE_SOURCE_URL';


/**
 * Other constants
 */

const DEFAULT_NUMBER_OF_SOURCE_URLS = 6;

// source URL representation in store.
const defaultSourceURL = { url: 'https://www.zalora.', imageNumber: 1 };


/**
 * Factory functions
 */

export const sourceURLFactory = () => ({
  ...defaultSourceURL,
  id: generateId(),
});

/**
 * Creates array that will be the default state of sourceURL reducer.
 */
export const initSourceURL = () => (
  Array(DEFAULT_NUMBER_OF_SOURCE_URLS)
    .fill('')
    .map(sourceURLFactory)
);

/**
 * Initialize images state with array of empty strings.
 * The number of default images is the same as the number of source URLs.
 */
export const initImages = () => (
  Array(DEFAULT_NUMBER_OF_SOURCE_URLS)
    .fill('')
);


/**
 * Initialize bannerId object.
 */
export const initBannerId = ({ index, pageNum }) => ({
  id: generateId(),
  index,
  selected: false,
  visibleOnPageNum: pageNum,
});


/**
 * Initialize image object.
 */
export const initImage = ({ index, image }) => {
  const newImage = {
    index,
    image,
    id: generateId(),
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
  return newImage;
};
