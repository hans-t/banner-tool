import React from 'react';
import { connect } from 'react-redux';
import { MultiSelectBox } from './common/multi-select';


const TemplatesSelectBox = ({ updateTemplates, templates, style }) => {
  const defaultStyle = {};

  return (
    <MultiSelectBox
      title="Select Templates"
      style={{ ...defaultStyle, ...style }}
      labels={templates}
      onChange={updateTemplates}
    />
  );
};

TemplatesSelectBox.propTypes = {
  updateTemplates: React.PropTypes.func.isRequired,
  templates: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

TemplatesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({ templates: state.templates }),
  dispatch => ({
    updateTemplates: templates => dispatch({
      type: 'SELECT_TEMPLATES',
      templates,
    }),
  })
)(TemplatesSelectBox);
