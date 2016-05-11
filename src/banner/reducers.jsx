import {
  setDefaultValue,
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
      case GO_TO_NEXT_PAGE: {
        const newState = {};
        Object.keys(state).forEach(country => {
          newState[country] = state[country].map(el => {
            const { selected, visibleOnPageNum } = el;
            const { currentPageNum } = action;
            if (visibleOnPageNum === currentPageNum && selected) {
              return { ...el, visibleOnPageNum: visibleOnPageNum + 1 };
            } else {
              return { ...el };
            }
          });
        });
        return newState;
      }

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
  const id = action.id;
  const props = setDefaultValue(state[id], {});

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

    case 'SET_BANNER_CTA_URL':
      return {
        ...state,
        [id]: { ...props, cta_url: action.cta_url },
      };

    case 'TOGGLE_BANNER_EDIT_OVERLAY':
      return {
        ...state,
        [id]: { ...props, selected: !props.showEditOverlay },
      };

    case 'SET_BANNER_DATA_URI':
      return {
        ...state,
        [id]: { ...props, dataURI: action.dataURI },
      };

    case 'SET_BANNER_FORMAT':
      return {
        ...state,
        [id]: { ...props, format: action.format },
      };

    case 'SET_BANNER_COMPRESSION_LEVEL':
      return {
        ...state,
        [id]: { ...props, compressionLevel: action.compressionLevel },
      };

    default:
      return state;
  }
}


export function textsById(state = {}, action) {
  const id = action.id;
  const texts = setDefaultValue(state[id], {});

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

    case 'SET_HEADLINE':
      return {
        ...state,
        [id]: { ...texts, headline: action.headline },
      };

    case 'SET_TITLE':
      return {
        ...state,
        [id]: { ...texts, title: action.title },
      };

    case 'SET_COPY1':
      return {
        ...state,
        [id]: { ...texts, copy1: action.copy1 },
      };

    case 'SET_COPY2':
      return {
        ...state,
        [id]: { ...texts, copy2: action.copy2 },
      };

    case 'SET_COPY3':
      return {
        ...state,
        [id]: { ...texts, copy3: action.copy3 },
      };

    default:
      return state;
  }
}
