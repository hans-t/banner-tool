import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MultiSelectBox } from '../common/multi-select';
import { templateSelectionActionCreators } from './actionCreators';
import { removeExistingCombinationsAction } from '../banner/actionCreators';


function getTemplateLabels(templates) {
  return Object.keys(templates).map(templateName => ({
    value: templateName,
    selected: templates[templateName].selected,
  }));
}


const TemplatesSelectBox = ({
  removeExistingCombinations,
  selectTemplates,
  templateLabels,
  propsById,
  style,
}) => {
  const onChange = (labels) => {
    selectTemplates(labels);
    const removedTemplates = labels
      .filter(el => !el.selected)
      .map(el => el.value);

    const removedTemplatesSet = new Set(removedTemplates);
    const removedIds = Object.keys(propsById).filter(key => (
      removedTemplatesSet.has(propsById[key].templateName)
    ));
    removeExistingCombinations(removedIds);
  };

  return (
    <MultiSelectBox
      title="Select Templates"
      style={style}
      labels={templateLabels}
      onChange={onChange}
      required
    />
  );
};

TemplatesSelectBox.propTypes = {
  removeExistingCombinations: React.PropTypes.func.isRequired,
  selectTemplates: React.PropTypes.func.isRequired,
  templateLabels: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};

TemplatesSelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({
    templateLabels: getTemplateLabels(state.templates),
    propsById: state.propsById,
  }),
  dispatch => ({
    ...bindActionCreators(templateSelectionActionCreators, dispatch),
    removeExistingCombinations: (bannerIds) => (
      dispatch(removeExistingCombinationsAction(false, bannerIds))
    ),
  })
)(TemplatesSelectBox);
