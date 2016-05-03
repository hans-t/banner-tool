import {
  groupReducerByCountry,
  addToArray,
  removeFromArray,
  replaceValueInArray,
} from '../common/helpers';


const defaultSourceURLValues = {
  url: 'https://www.zalora.',
  imageNumber: 1,
};


const defaultSourceURLValuesFactory = () => ({ ...defaultSourceURLValues });


const initialStateFactory = () => (
  Array(6)
  .fill(0)
  .map(defaultSourceURLValuesFactory)
);


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
 * Images state is an array of image objects which the following information about the image:
 * dataURI: base 64 encoded image data.
 * width: width of the image.
 * height: height of the image.
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


export const imagesByCountry = groupReducerByCountry(images);
export const sourceURLsByCountry = groupReducerByCountry(sourceURLs, initialStateFactory);
