import {
  ADD_NEW_COMBINATIONS,
  REMOVE_EXISTING_COMBINATIONS,
  TOGGLE_BANNER_SELECTION,
  REPLACE_COMBINATIONS,
} from './actions';


export const addNewCombinationsAction = (country, combinations) => ({
  type: ADD_NEW_COMBINATIONS,
  country,
  ...combinations,
});


export const removeExistingCombinationsAction = (country, bannerIds) => ({
  type: REMOVE_EXISTING_COMBINATIONS,
  country,
  bannerIds,
});


export const toggleBannerSelection = (country, index) => ({
  type: TOGGLE_BANNER_SELECTION,
  country,
  index,
});


export const replaceCombinationsAction = (combinations) => ({
  type: REPLACE_COMBINATIONS,
  ...combinations,
});
