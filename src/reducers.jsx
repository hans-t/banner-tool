import { combineReducers } from 'redux';

import * as common from './common/reducers';
import * as indexPage from './index-page/reducers';
import * as addImagesPage from './add-images-page/reducers';
import * as banner from './banner/reducers';


export default combineReducers({
  ...common,
  ...indexPage,
  ...addImagesPage,
  ...banner,
});
