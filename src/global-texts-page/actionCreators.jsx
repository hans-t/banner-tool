import { UPDATE_GLOBAL_COPY } from './actions';


export function updateGlobalCopyAction({ countries, copyType, copy }) {
  return {
    type: UPDATE_GLOBAL_COPY,
    countries,
    copyType,
    copy,
  };
}
