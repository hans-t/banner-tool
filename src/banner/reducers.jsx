import {
  setDefaultValue,
  omitKeys,
  groupReducerByCountry,
  replaceValueInArray,
} from '../common/helpers';


const ADD_BANNER_IDS = 'ADD_BANNER_IDS';
const REMOVE_BANNER_IDS = 'REMOVE_BANNER_IDS';


function bannerIds(state = [], action) {
  switch (action.type) {
    case ADD_BANNER_IDS:
      return action.bannerIds;

    case 'TOGGLE_BANNER_ID_SELECTION': {
      const index = action.index;
      const bannerId = state[index];
      return replaceValueInArray(state, index, { ...bannerId, selected: !bannerId.selected });
    }

    case REMOVE_BANNER_IDS:
      return [];

    default:
      return state;
  }
}

export const bannerIdsByCountry = groupReducerByCountry(bannerIds);


export function imageSetsById(state = {}, action) {
  switch (action.type) {
    case ADD_BANNER_IDS:
      return {
        ...state,
        ...action.imageSetsById,
      };

    case REMOVE_BANNER_IDS:
      return omitKeys(state, action.ids);

    default:
      return state;
  }
}


export function propsById(state = {}, action) {
  const id = action.id;
  const props = setDefaultValue(state[id], {});

  switch (action.type) {
    case ADD_BANNER_IDS:
      return {
        ...state,
        ...action.propsById,
      };

    case REMOVE_BANNER_IDS:
      return omitKeys(state, action.ids);

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
    case ADD_BANNER_IDS:
      return {
        ...state,
        ...action.textsById,
      };

    case REMOVE_BANNER_IDS:
      return omitKeys(state, action.ids);

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
