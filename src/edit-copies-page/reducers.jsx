import copyTranslations from '../common/copyTranslations';
import { groupReducerByCountry } from '../common/helpers';
import {
  UPDATE_TRANSLATED_COPY,
  TRANSLATE_COPY,
  initTexts,
} from './actions';


function translateCopy({ copyType, country, copy }) {
  const translatedText = copyTranslations[copyType][country][copy.text] || '';
  return {
    text: translatedText,
    color: copy.color,
  };
}


function texts(state = {}, action) {
  const { type, copyType, copy } = action;
  switch (type) {
    case UPDATE_TRANSLATED_COPY:
      return {
        ...state,
        [copyType]: copy,
      };

    default:
      return state;
  }
}


function defaultReducer(state, action) {
  const { type, countries, copies } = action;
  switch (type) {
    case TRANSLATE_COPY:
      return countries.reduce((newState, country) => ({
        ...newState,
        [country]: Object.keys(copies).reduce((translatedCopies, copyType) => ({
          ...translatedCopies,
          [copyType]: translateCopy({
            country,
            copyType,
            copy: copies[copyType],
          }),
        }), {}),
      }), {});

    default:
      return state;
  }
}


export const textsByCountry = groupReducerByCountry(texts, initTexts, defaultReducer);
