import { generate as generateId } from 'shortid';


/**
 * Action types:
 */
export const ADD_SOURCE = 'ADD_SOURCE';

export const EDIT_SOURCE = 'EDIT_SOURCE';

export const REMOVE_SOURCE = 'REMOVE_SOURCE';


/**
 * Other constants
 */


// source URL representation in store.
const defaultSource = {
  url: '',
  imageNumber: '1',
};


/**
 * Factory functions
 */

export const sourceFactory = () => ({
  ...defaultSource,
  id: generateId(),
});


/**
 * Initializer functions
 */
export const initImage = ({ index, image }) => ({
  index,
  image,
  id: generateId(),
  width: image.naturalWidth,
  height: image.naturalHeight,
});
