import { UPDATE_TRANSLATED_COPY } from './actions';


export function updateTranslatedCopyAction({ country, copyType, copy }) {
  return {
    type: UPDATE_TRANSLATED_COPY,
    country,
    copyType,
    copy,
  };
}
