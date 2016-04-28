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


function bannerIds(state = [], action) {
  switch (action.type) {
    case 'ADD_BANNER_IDS':
      return action.bannerIds;

    case 'TOGGLE_BANNER_ID_SELECTION': {
      const index = action.index;
      const bannerId = state[index];
      return replaceValueInArray(state, index, { ...bannerId, selected: !bannerId.selected });
    }

    case 'REMOVE_BANNER_IDS':
      return [];

    default:
      return state;
  }
}


export const bannerIdsByCountry = groupReducerByCountry(bannerIds);
export const sourceURLsByCountry = groupReducerByCountry(sourceURLs, initialStateFactory);
