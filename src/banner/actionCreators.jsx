import {
  UPDATE_COMBINATIONS,
  REMOVE_BANNER_IDS,
  TOGGLE_BANNER_SELECTION,
} from './actions';


export const updateCombinationsAction = (country, combinations) => ({
  type: UPDATE_COMBINATIONS,
  country,
  ...combinations,
});


export const removeBannerIdsAction = (country, bannerIds) => ({
  type: REMOVE_BANNER_IDS,
  country,
  bannerIds,
});


export const toggleBannerSelection = (country, index) => ({
  type: TOGGLE_BANNER_SELECTION,
  country,
  index,
});
