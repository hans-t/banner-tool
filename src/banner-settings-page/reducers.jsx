import { SET_BANNER_PROPS } from './actions';


const defaultSettings = {
  backgroundColor: '#FFFFFF',
};


export function globalProps(state = defaultSettings, action) {
  const { type, property, value } = action;
  switch (type) {
    case SET_BANNER_PROPS:
      return { ...state, [property]: value };

    default:
      return state;
  }
}
