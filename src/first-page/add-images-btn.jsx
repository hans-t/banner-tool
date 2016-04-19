import React from 'react';
import { connect } from 'react-redux';
import { PAGE } from '../common/constants';
import { isAnySelected } from '../common/helpers';
import RaisedButton from 'material-ui/lib/raised-button';
import { NextButtonContainer } from '../common/containers';


const addImagesBtn = ({ selectedChannel, countries, templates, changePage }) => {
  const onClick = () => {
    if (selectedChannel && isAnySelected(countries) && isAnySelected(templates)) {
      changePage(PAGE.addImages);
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
  templates: React.PropTypes.array.isRequired,
  changePage: React.PropTypes.func.isRequired,
};


export default connect(
  (state) => ({
    selectedChannel: state.selectedChannel,
    countries: state.countries,
    templates: state.templates,
  }),
  (dispatch) => ({
    changePage: page => dispatch({
      type: 'CHANGE_PAGE',
      page,
    }),
  })
)(addImagesBtn);
