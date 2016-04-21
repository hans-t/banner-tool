import { combineReducers } from 'redux';

import * as firstPage from './first-page/reducers';
import * as banner from './banner/reducers';


export function page(state = '', action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;

    default:
      return state;
  }
}


export default combineReducers({
  page,
  ...firstPage,
  ...banner,
});
