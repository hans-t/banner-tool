import { UPDATE_COPY } from './actions';


export function updateCopyAction({ countries, copyType, copy }) {
  return {
    type: UPDATE_COPY,
    countries,
    copyType,
    copy,
  };
}
