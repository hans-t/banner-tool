import { combineReducers } from 'redux';

import * as common from './common/reducers';
import * as firstPage from './first-page/reducers';
import * as addImagesPage from './add-images-page/reducers';
import * as banner from './banner/reducers';


export default combineReducers({
  ...common,
  ...firstPage,
  ...addImagesPage,
  ...banner,
});
