import {
  omitKeys,
  groupReducerByCountry,
  replaceValueInArray,
} from '../common/helpers';

import {
  TOGGLE_BANNER_SELECTION,
  REMOVE_EXISTING_COMBINATIONS,
  REPLACE_COMBINATIONS,
  ADD_NEW_COMBINATIONS,
} from './actions';

import { GO_TO_NEXT_PAGE } from '../common/actions';


/**
 * State is an array of objects, where each contains the following information
 * about a banner:
 * @param {string} id: Unique ID of a banner.
 * @param {number} index: Index of the object in the containing array.
 * @param {boolean} selected: Boolean that tells whether a banner is
 * selected by user.
 * @param {number} visibleOnPageNum: An integer that specify which page
 * should the banner be displayed.
 */
function bannerIds(state = [], action) {
  const { type, index, currentPageNum } = action;
  switch (type) {
    case ADD_NEW_COMBINATIONS:
      return action.bannerIds;

    /**
     * When selecting/deselecting banner, record the page number where that happened.
     */
    case TOGGLE_BANNER_SELECTION: {
      const bannerId = state[index];
      return replaceValueInArray(state, index, {
        ...bannerId,
        selected: !bannerId.selected,
        visibleOnPageNum: currentPageNum,
      });
    }

    case REMOVE_EXISTING_COMBINATIONS:
      if (action.bannerIds.length > 0) {
        return [];
      } else {
        return state;
      }

    default:
      return state;
  }
}


export const bannerIdsByCountry = groupReducerByCountry(
  bannerIds,
  undefined,
  (state, action) => {
    switch (action.type) {
      /**
       * When moving to next page, if the banner is selected, and
       * only on the latest page it should be displayed on.
       * E.g. banner 1 is available until page 4. User goes back to page 2, and
       * deselect the banner. The banner now have visibleOnPageNum === 2.
       *
       * E.g. banner 2 is available until page 4. User deselect the banner, and move
       * to next page, Banner 2 will be available until page 5.
       */
      case GO_TO_NEXT_PAGE:
        return Object.keys(state).reduce((obj, country) => ({
          ...obj,
          [country]: state[country].map(el => {
            const { selected, visibleOnPageNum } = el;
            const { currentPageNum } = action;
            if (visibleOnPageNum === currentPageNum && selected) {
              return { ...el, visibleOnPageNum: visibleOnPageNum + 1 };
            } else {
              return { ...el };
            }
          }),
        }), {});

      case REPLACE_COMBINATIONS:
        return action.bannerIdsByCountry;

      default:
        return state;
    }
  }
);


export function imageSetsById(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_COMBINATIONS:
      return {
        ...state,
        ...action.imageSetsById,
      };

    case REMOVE_EXISTING_COMBINATIONS:
      return omitKeys(state, action.bannerIds);

    case REPLACE_COMBINATIONS:
      return action.imageSetsById;

    default:
      return state;
  }
}


export function propsById(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_COMBINATIONS:
      return {
        ...state,
        ...action.propsById,
      };

    case REMOVE_EXISTING_COMBINATIONS:
      return omitKeys(state, action.bannerIds);

    case REPLACE_COMBINATIONS:
      return action.propsById;

    default:
      return state;
  }
}


export function textsById(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_COMBINATIONS:
      return {
        ...state,
        ...action.textsById,
      };

    case REMOVE_EXISTING_COMBINATIONS:
      return omitKeys(state, action.bannerIds);

    case REPLACE_COMBINATIONS:
      return action.textsById;

    default:
      return state;
  }
}
