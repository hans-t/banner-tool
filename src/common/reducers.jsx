export function selectedChannel(state = '', action) {
  switch (action.type) {
    case 'SELECT_CHANNEL':
      return action.channel;

    default:
      return state;
  }
}

export function selectedCountries(state = [], action) {
  switch (action.type) {
    case 'SELECT_COUNTRIES':
      return action.countries;

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
