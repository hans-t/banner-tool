import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MultiSelectBox } from '../common/multi-select';
import { templateSelectionActionCreators } from './actionCreators';


function getTemplateLabels(templates) {
  return Object.keys(templates).map(templateName => ({
    value: templateName,
    selected: templates[templateName].selected,
  }));
}


const TemplatesSelectBox = ({ selectTemplates, templateLabels, style }) => {
  const defaultStyle = {};

  return (
    <MultiSelectBox
      title="Select Templates"
      style={{ ...defaultStyle, ...style }}
      labels={templateLabels}
      onChange={selectTemplates}
      required
    />
  );
};

TemplatesSelectBox.propTypes = {
  selectTemplates: React.PropTypes.func.isRequired,
  templateLabels: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

TemplatesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({ templateLabels: getTemplateLabels(state.templates) }),
  dispatch => bindActionCreators(templateSelectionActionCreators, dispatch)
)(TemplatesSelectBox);
