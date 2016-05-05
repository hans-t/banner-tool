import { AVAILABLE_COUNTRIES_OPTION } from '../common/constants';

import {
  SELECT_CHANNEL,
  SELECT_COUNTRIES,
  ADD_TEMPLATE,
  REMOVE_TEMPLATES,
  SELECT_TEMPLATES,
} from './actions';


export function selectedChannel(state = '', action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;

    default:
      return state;
  }
}


export function countries(state = AVAILABLE_COUNTRIES_OPTION, action) {
  switch (action.type) {
    case SELECT_COUNTRIES:
      return action.countries;

    default:
      return state;
  }
}

/**
 * templates is an object whose key is the name of the template and whose value
 * is an object that describes a banner template.
 */

export function templates(state = {}, action) {
  switch (action.type) {
    case ADD_TEMPLATE:
      return {
        ...state,
        [action.name]: action.template,
      };

    case REMOVE_TEMPLATES:
      return {};

    case SELECT_TEMPLATES: {
      const newState = {};
      action.labels.forEach(({ value, selected }) => {
        newState[value] = { ...state[value], selected };
      });
      return newState;
    }

    default:
      return state;
  }
}
