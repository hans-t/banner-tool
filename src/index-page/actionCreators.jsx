import {
  SELECT_CHANNEL,
  SELECT_COUNTRIES,
  ADD_TEMPLATE,
  REMOVE_TEMPLATES,
  SELECT_TEMPLATES,
} from './actions';


export const updateChannel = channel => ({
  type: SELECT_CHANNEL,
  channel,
});


export const selectCountries = countries => ({
  type: SELECT_COUNTRIES,
  countries,
});


export const addTemplate = ({ name, template }) => ({
  type: ADD_TEMPLATE,
  name,
  template,
});


export const removeTemplates = () => ({
  type: REMOVE_TEMPLATES,
});


export const selectTemplates = labels => ({
  type: SELECT_TEMPLATES,
  labels,
});


export const channelSelectionActionCreators = {
  updateChannel,
  addTemplate,
  removeTemplates,
};


export const templateSelectionActionCreators = {
  selectTemplates,
};


export const countriesSelectionActionCreators = {
  selectCountries,
};
