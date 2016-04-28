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


export function templateLabels(state = [], action) {
  const { type, labels } = action;

  switch (type) {
    case 'ADD_OR_REPLACE_TEMPLATE_LABELS':
      return labels;

    case 'SELECT_TEMPLATE_LABELS':
      return labels;

    default:
      return state;
  }
}


export function templates(state = [], action) {
  switch (action.type) {
    case 'ADD_OR_REPLACE_TEMPLATES':
      return action.templates;

    default:
      return state;
  }
}
