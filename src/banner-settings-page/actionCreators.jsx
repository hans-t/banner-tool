import { SET_BANNER_PROPS } from './actions';


export function setBannerProps({ property, value }) {
  return {
    type: SET_BANNER_PROPS,
    property,
    value,
  };
}
