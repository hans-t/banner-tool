import { UPDATE_COPY } from './actions';


export function copies(state = {}, action) {
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
