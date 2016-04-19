import { combineReducers } from 'redux';

import * as firstPage from './first-page/reducers';
import * as banners from './banners/reducers';


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
  ...banners,
});
