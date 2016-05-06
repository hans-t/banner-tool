import {
  UPDATE_COMBINATIONS,
  REMOVE_BANNER_IDS,
  TOGGLE_BANNER_SELECTION,
} from './actions';


export const updateCombinations = (country, combinations) => ({
  type: UPDATE_COMBINATIONS,
  country,
  ...combinations,
});


export const removeBannerIds = (country, bannerIds) => ({
  type: REMOVE_BANNER_IDS,
  country,
  bannerIds,
});


export const toggleBannerSelection = (country, index) => ({
  type: TOGGLE_BANNER_SELECTION,
  index,
})
