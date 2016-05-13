import { combineReducers } from 'redux';

import * as common from './common/reducers';
import * as indexPage from './index-page/reducers';
import * as sourcesPage from './sources-page/reducers';
import * as copyPage from './copy-page/reducers';
import * as texts from './texts-page/reducers';
import * as banner from './banner/reducers';


export default combineReducers({
  ...common,
  ...indexPage,
  ...sourcesPage,
  ...banner,
  ...copyPage,
  ...texts,
});
