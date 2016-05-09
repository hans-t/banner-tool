import { UPDATE_GLOBAL_COPY } from './actions';


export function globalTexts(state = {}, action) {
  const { type, copyType, copy } = action;
  switch (type) {
    case UPDATE_GLOBAL_COPY:
      return {
        ...state,
        [copyType]: copy,
      };

    default:
      return state;
  }
}
