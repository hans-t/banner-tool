import React from 'react';
import { connect } from 'react-redux';
import { MultiSelectBox } from '../common/multi-select';


const TemplatesSelectBox = ({ updateTemplates, templateLabels, style }) => {
  const defaultStyle = {};

  return (
    <MultiSelectBox
      title="Select Templates"
      style={{ ...defaultStyle, ...style }}
      labels={templateLabels}
      onChange={updateTemplates}
      required
    />
  );
};

TemplatesSelectBox.propTypes = {
  updateTemplates: React.PropTypes.func.isRequired,
  templateLabels: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

TemplatesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({ templateLabels: state.templateLabels }),
  dispatch => ({
    updateTemplates: labels => dispatch({
      type: 'SELECT_TEMPLATE_LABELS',
      labels,
    }),
  })
)(TemplatesSelectBox);
