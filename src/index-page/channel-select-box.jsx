import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, SelectField } from 'material-ui';

import { channelSelectionActionCreators } from './actionCreators';
import { AVAILABLE_CHANNELS_OPTION, ROOT_TEMPLATES_PATH } from '../common/constants';


function fetchTemplates(channel, addTemplate) {
  const templatesPath = `${ROOT_TEMPLATES_PATH}/${channel}`;
  const templatesListJSON = `${templatesPath}/templates.json`;
  switch (channel) {
    case 'mobile':
      fetch(templatesListJSON)
        .then(response => response.json())
        .then(templateList => {
          templateList.forEach(templateName => {
            fetch(`${templatesPath}/${templateName}.json`)
              .then(response => response.json())
              .then(template => addTemplate({ name: templateName, template }));
          });
        });
      break;

    default:
      break;
  }
}


const ChannelSelectBox = ({
  style,
  selectedChannel,
  updateChannel,
  addTemplate,
  removeTemplates,
}) => {
  const handleChange = (event, index, channel) => {
    updateChannel(channel);
    removeTemplates();
    fetchTemplates(channel, addTemplate);
  };

  return (
    <SelectField
      style={style}
      value={selectedChannel}
      onChange={handleChange}
      floatingLabelText="Select Channel"
      errorText={selectedChannel ? '' : 'Required'}
    >
      {AVAILABLE_CHANNELS_OPTION.map((el, index) => (
        <MenuItem key={index} value={el.toLowerCase()} primaryText={el} />
      ))}
    </SelectField>
  );
};

ChannelSelectBox.propTypes = {
  style: React.PropTypes.object,
  selectedChannel: React.PropTypes.string,
  updateChannel: React.PropTypes.func.isRequired,
  addTemplate: React.PropTypes.func.isRequired,
  removeTemplates: React.PropTypes.func.isRequired,
};


export default connect(
  state => ({
    selectedChannel: state.selectedChannel,
  }),
  channelSelectionActionCreators
)(ChannelSelectBox);
