/*
{
  sourceUrlsByCountry: {
    sg: ['url1', 'url2'],
    id: ['url3'],
  }
}

*/


export function sourceUrls(state={}, action) {
  const country = action.country;
  const url = action.url;
  const urls = state[country] || [];

  switch (action.type) {
    case 'ADD_SOURCE_URL':
      return {
        ...state,
        [country]: [...urls, url],
      };

    case 'REMOVE_SOURCE_URL': {
      const index = urls.findIndex(el => el === url);
      return {
        ...state,
        [country]: urls.slice(0, index).concat(index + 1),
      };
    }

    default:
      return state;
  }
}