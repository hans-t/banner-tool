import { combineReducers } from 'redux';

import * as common from './common/reducers';
import * as indexPage from './index-page/reducers';
import * as sourcesPage from './sources-page/reducers';
import * as addCopyPage from './add-copies-page/reducers';
import * as editCopiesPage from './edit-copies-page/reducers';
import * as bannerSettingsPage from './banner-settings-page/reducers';
import * as banner from './banner/reducers';


export default combineReducers({
  ...common,
  ...indexPage,
  ...sourcesPage,
  ...banner,
  ...addCopyPage,
  ...editCopiesPage,
  ...bannerSettingsPage,
});
