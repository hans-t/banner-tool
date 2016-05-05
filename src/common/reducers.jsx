import { CHANGE_PAGE } from './actions';
import { PAGE } from './constants';


export function page(state = PAGE.index, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.page;

    default:
      return state;
  }
}
