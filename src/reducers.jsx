import { combineReducers } from 'redux';

import banners from './banners/reducers';
import * as common from './common/reducers';


export default combineReducers({
  ...common,
  banners,
})