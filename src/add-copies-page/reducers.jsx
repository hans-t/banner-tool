import { UPDATE_COPY } from './actions';
import copyTranslations from '../common/copyTranslations';


const defaultState = Object.keys(copyTranslations)
  .reduce((obj, curr) => ({
    ...obj,
    [curr]: '',
  }), {});


export function copies(state = defaultState, action) {
  const { type, copyType, copy } = action;
  switch (type) {
    case UPDATE_COPY:
      return {
        ...state,
        [copyType]: copy,
      };

    default:
      return state;
  }
}
