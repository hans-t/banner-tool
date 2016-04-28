import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import NextButtonContainer from '../common/next-btn-container';

import { PAGE } from '../common/constants';
import { isAnySelected } from '../common/helpers';


function isAnyTemplatesSelected(templates) {
  const templateValues = Object.keys(templates).map(name => templates[name]);
  return isAnySelected(templateValues);
}


const addImagesBtn = ({ selectedChannel, countries, templates, changePage }) => {
  const onClick = () => {
    if (selectedChannel && isAnySelected(countries) && isAnyTemplatesSelected(templates)) {
      changePage(PAGE.addImages, true);
    }
  };

  return (
    <NextButtonContainer>
      <RaisedButton label="Add Images" primary onClick={onClick} />
    </NextButtonContainer>
  );
};

addImagesBtn.propTypes = {
  selectedChannel: React.PropTypes.string.isRequired,
  countries: React.PropTypes.array.isRequired,
  templates: React.PropTypes.object.isRequired,
  changePage: React.PropTypes.func.isRequired,
};


export default connect(
  (state) => ({
    selectedChannel: state.selectedChannel,
    countries: state.countries,
    templates: state.templates,
  }),
  (dispatch) => ({
    changePage: (value, isNextPage) => dispatch({
      type: 'CHANGE_PAGE',
      value,
      isNextPage,
    }),
  })
)(addImagesBtn);
