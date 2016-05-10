import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREV_PAGE,
} from './actions';


export function goToNextPageAction() {
  return { type: GO_TO_NEXT_PAGE };
}


export function goToPrevPageAction() {
  return { type: GO_TO_PREV_PAGE };
}
