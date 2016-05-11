import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREV_PAGE,
} from './actions';


export function goToNextPageAction(currentPageNum) {
  return { type: GO_TO_NEXT_PAGE, currentPageNum };
}


export function goToPrevPageAction(currentPageNum) {
  return { type: GO_TO_PREV_PAGE, currentPageNum };
}
