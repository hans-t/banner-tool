import { combineReducers } from 'redux';

import * as firstPage from './first-page/reducers';
import * as banner from './banner/reducers';


export function page(state = {}, action) {
  // if action.isNextPage = true, means the new page is next page, else previous page.
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        value: action.page,
        isNextPage: action.isNextPage,
      };

    default:
      return state;
  }
}


export default combineReducers({
  page,
  ...firstPage,
  ...banner,
});
