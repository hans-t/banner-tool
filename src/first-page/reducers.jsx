import { AVAILABLE_COUNTRIES_OPTION } from '../common/constants';


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
    case 'REFRESH_TEMPLATE_OPTIONS': {
      return action.templates;
    }

    case 'SELECT_TEMPLATES':
      return action.templates;

    default:
      return state;
  }
}
