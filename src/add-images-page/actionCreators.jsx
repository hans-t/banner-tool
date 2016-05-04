import {
  ADD_SOURCE_URL,
  EDIT_SOURCE_URL,
  REMOVE_SOURCE_URL,
  ADD_IMAGE,
  REPLACE_IMAGE,
  REMOVE_IMAGE,
} from './actions';


export const addImage = (country) => ({
  type: ADD_IMAGE,
  country,
});

export const replaceImage = (country, index, image) => ({
  type: REPLACE_IMAGE,
  country,
  index,
  image,
});

export const removeImage = (country, index) => ({
  type: REMOVE_IMAGE,
  country,
  index,
});

export const addSourceURL = (country) => ({
  type: ADD_SOURCE_URL,
  country,
});

export const editSourceURL = (country, index, values) => ({
  type: EDIT_SOURCE_URL,
  country,
  index,
  values,
});

export const removeSourceURL = (country, index) => ({
  type: REMOVE_SOURCE_URL,
  country,
  index,
});
