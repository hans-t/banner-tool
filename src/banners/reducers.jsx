import { combineReducers } from 'redux';
import { setDefaultValue } from '../common/helpers';


export function ids(state = [], action) {
  const id = action.id;

  switch (action.type) {
    case 'ADD_BANNER':
      return state.concat(id);

    case 'REMOVE_BANNER':
      const index = state.find(el => el === id);
      const newState = index === -1 ? state : state.slice(0, index).concat(state.slice(index + 1));
      return newState;

    default:
      return state;
  }
}


export function imagesById(state = {}, action) {
  const id = action.id;
  const images = setDefaultValue(state[action.id], []);

  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        ...state,
        [id]: images.concat(action.image),
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
        [id]: {...props, cta_url: action.cta_url},
      };

    case 'TOGGLE_BANNER_SELECTION':
      return {
        ...state,
        [id]: {...props, selected: !props.selected},
      };

    case 'TOGGLE_BANNER_EDIT_OVERLAY':
      return {
        ...state,
        [id]: {...props, selected: !props.showEditOverlay},
      };

    case 'SET_BANNER_DATA_URI_PREVIEW':
      return {
        ...state,
        [id]: {...props, dataUriPreview: action.dataUriPreview},
      };

    case 'SET_BANNER_DATA_URI':
      return {
        ...state,
        [id]: {...props, dataUri: action.dataUri},
      };

    case 'SET_BANNER_FORMAT':
      return {
        ...state,
        [id]: {...props, format: action.format},
      };

    case 'SET_BANNER_COMPRESSION_LEVEL':
      return {
        ...state,
        [id]: {...props, compressionLevel: action.compressionLevel},
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
        [id]: {...texts, headline: action.headline}
      };

    case 'SET_TITLE':
      return {
        ...state,
        [id]: {...texts, title: action.title}
      };

    case 'SET_COPY1':
      return {
        ...state,
        [id]: {...texts, copy1: action.copy1}
      };

    case 'SET_COPY2':
      return {
        ...state,
        [id]: {...texts, copy2: action.copy2}
      };

    case 'SET_COPY3':
      return {
        ...state,
        [id]: {...texts, copy3: action.copy3}
      };

    default:
      return state;
  }
}

export default combineReducers({
  ids,
  imagesById,
  textsById,
  propsById,
})