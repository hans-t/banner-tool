import { combineReducers } from 'redux';

import * as firstPage from './first-page/reducers';
import * as banners from './banners/reducers';


export default combineReducers({
  ...firstPage,
  ...banners,
});
