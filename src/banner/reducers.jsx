import { setDefaultValue } from '../common/helpers';


export function bannerIdsByCountry(state = {}, action) {
  const { id, ids, country, type } = action;
  const bannerIds = country in state ? state[country] : [];

  switch (type) {
    case 'ADD_BANNERS':
      return {
        ...state,
        [country]: bannerIds.concat(ids),
      };

    case 'ADD_BANNER':
      return {
        ...state,
        [country]: bannerIds.concat(id),
      };

    case 'REMOVE_BANNER': {
      const index = bannerIds.find(el => el === id);
      const newBannerIds = index === -1 ? bannerIds : bannerIds.slice(0, index).concat(bannerIds.slice(index + 1));
      return {
        ...state,
        [country]: newBannerIds,
      };
    }

    default:
      return state;
  }
}


export function imagesById(state = {}, action) {
  const { id, type, image } = action;
  const images = setDefaultValue(state[id], []);

  switch (type) {
    case 'ADD_IMAGE':
      return {
        ...state,
        [id]: images.concat(image),
      };

    default:
      return state;
  }
}


export function propsById(state = {}, action) {
  const id = action.id;
  const props = setDefaultValue(state[id], {});

  switch (action.type) {
    case 'SET_BANNER_CTA_URL':
      return {
        ...state,
        [id]: { ...props, cta_url: action.cta_url },
      };

    case 'TOGGLE_BANNER_SELECTION':
      return {
        ...state,
        [id]: { ...props, selected: !props.selected },
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
