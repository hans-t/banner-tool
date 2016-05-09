import {
  UPDATE_COPY,
  UPDATE_GLOBAL_COPY,
} from './actions';


export function updateCopyAction({ country, copyType, copy }) {
  return {
    type: UPDATE_COPY,
    country,
    copyType,
    copy,
  };
}


export function updateGlobalCopyAction({ countries, copyType, copy }) {
  return {
    type: UPDATE_GLOBAL_COPY,
    countries,
    copyType,
    copy,
  };
}
