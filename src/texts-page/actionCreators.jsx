import { UPDATE_COPY } from './actions';


export function updateCopyAction({ country, copyType, copy }) {
  return {
    type: UPDATE_COPY,
    country,
    copyType,
    copy,
  };
}
