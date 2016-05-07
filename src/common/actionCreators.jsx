import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREV_PAGE,
} from './actions';


export function goToNextPage() {
  return { type: GO_TO_NEXT_PAGE };
}


export function goToPrevPage() {
  return { type: GO_TO_PREV_PAGE };
}
