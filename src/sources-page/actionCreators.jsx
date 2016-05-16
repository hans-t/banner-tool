import {
  ADD_SOURCE,
  EDIT_SOURCE,
  REMOVE_SOURCE,
  COPY_SOURCES,
} from './actions';


export const addSource = () => ({
  type: ADD_SOURCE,
});

export const editSource = ({ index, values, image }) => ({
  type: EDIT_SOURCE,
  index,
  values,
  image,
});

export const removeSource = index => ({
  type: REMOVE_SOURCE,
  index,
});

export const copySources = ({ sources, images }) => ({
  type: COPY_SOURCES,
  sources,
  images,
});

