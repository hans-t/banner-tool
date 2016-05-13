import {
  ADD_SOURCE,
  EDIT_SOURCE,
  REMOVE_SOURCE,
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
