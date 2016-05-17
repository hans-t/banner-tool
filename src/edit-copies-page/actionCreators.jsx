import { UPDATE_TRANSLATED_COPY, TRANSLATE_COPY } from './actions';


export function updateTranslatedCopyAction({ country, copyType, copy }) {
  return {
    type: UPDATE_TRANSLATED_COPY,
    country,
    copyType,
    copy,
  };
}


export function translateCopyAction({ countries, copies }) {
  return {
    type: TRANSLATE_COPY,
    countries,
    copies,
  };
}
