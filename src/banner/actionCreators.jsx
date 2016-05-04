import {
  UPDATE_COMBINATIONS,
  REMOVE_BANNER_IDS
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
