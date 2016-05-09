import {
  ADD_SOURCE_URL,
  EDIT_SOURCE_URL,
  REMOVE_SOURCE_URL,
} from './actions';


export const addSourceURL = (country) => ({
  type: ADD_SOURCE_URL,
  country,
});

export const editSourceURL = ({ country, index, values, image }) => ({
  type: EDIT_SOURCE_URL,
  country,
  index,
  values,
  image,
});

export const removeSourceURL = (country, index) => ({
  type: REMOVE_SOURCE_URL,
  country,
  index,
});
