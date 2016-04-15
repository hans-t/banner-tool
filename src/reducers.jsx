import { combineReducers } from 'redux';

import * as banners from './banners/reducers';
import * as common from './common/reducers';


export default combineReducers({
  ...common,
  ...banners,
});
