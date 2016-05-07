import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREV_PAGE,
} from './actions';


/**
 * Beware of going out of bounds. E.g. state = -1 or state >= pages.length.
 */
export function pageNum(state = 0, action) {
  switch (action.type) {
    case GO_TO_NEXT_PAGE:
      return state + 1;

    case GO_TO_PREV_PAGE:
      return state - 1;

    default:
      return state;
  }
}
