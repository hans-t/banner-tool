import {
  UPDATE_COPY,
  initTexts,
} from './actions';

import { UPDATE_GLOBAL_COPY } from '../global-texts-page/actions';
import copyTranslations from '../common/copyTranslations';
import { groupReducerByCountry } from '../common/helpers';


function texts(state = {}, action) {
  const { type, copyType, copy } = action;
  switch (type) {
    case UPDATE_COPY:
      return {
        ...state,
        [copyType]: copy,
      };

    default:
      return state;
  }
}


function updateTranslations(state, action) {
  const { type, countries, copyType, copy } = action;
  switch (type) {
    case UPDATE_GLOBAL_COPY: {
      const newState = {};
      countries.forEach(country => {
        const obj = state[country];
        const translatedCopy = copyTranslations[copyType][country][copy];
        newState[country] = {
          ...obj,
          [copyType]: translatedCopy,
        };
      });
      return newState;
    }

    default:
      return state;
  }
}


export const textsByCountry = groupReducerByCountry(texts, initTexts, updateTranslations);
