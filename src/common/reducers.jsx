import { AVAILABLE_COUNTRIES_OPTION } from './constants';


export function selectedChannel(state = '', action) {
  switch (action.type) {
    case 'SELECT_CHANNEL':
      return action.channel;

    default:
      return state;
  }
}


export function countries(state = AVAILABLE_COUNTRIES_OPTION, action) {
  switch (action.type) {
    case 'SELECT_COUNTRIES':
      return action.countries;

    default:
      return state;
  }
}


export function templates(state = [], action) {
  switch (action.type) {
    case 'SELECT_TEMPLATES':
      return action.templates;

    default:
      return state;
  }
}


export function currentCountry(state = '', action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return action.country;

    default:
      return state;
  }
}
