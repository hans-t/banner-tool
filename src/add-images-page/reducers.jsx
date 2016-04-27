import { groupReducerByCountry } from '../common/helpers';


const defaultSourceURLValues = {
  url: 'https://www.zalora.',
  imageNumber: 1,
};


const defaultSourceURLValuesFactory = () => ({ ...defaultSourceURLValues });


const initialStateFactory = () => (
  Array(6)
  .fill(0)
  .map(defaultSourceURLValuesFactory)
);


function sourceURLs(state = [], action) {
  const { index, values } = action;

  switch (action.type) {
    case 'ADD_SOURCE_URL':
      return state.concat(defaultSourceURLValuesFactory());

    case 'EDIT_SOURCE_URL':
      return state
        .slice(0, index)
        .concat(values)
        .concat(state.slice(index + 1));

    case 'REMOVE_SOURCE_URL': {
      if (state.length > 1) {
        return state
          .slice(0, index)
          .concat(state.slice(index + 1));
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}


export const sourceURLsByCountry = groupReducerByCountry(sourceURLs, initialStateFactory);
