import { CHANGE_PAGE } from './actions';


export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}
