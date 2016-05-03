import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import { AVAILABLE_CHANNELS_OPTION } from '../common/constants';


function getTemplates(channel, addTemplate) {
  const templatesPath = 'static/templates';
  if (channel === 'mobile') {
    const mobileTemplatesPath = `${templatesPath}/mobile`;
    fetch(`${mobileTemplatesPath}/templates.json`)
      .then(response => response.json())
      .then(templateList => {
        templateList.forEach(templateName => {
          fetch(`${mobileTemplatesPath}/${templateName}.json`)
            .then(response => response.json())
            .then(template => addTemplate({ name: templateName, template }));
        });
      });
  }
}


const ChannelSelectBox = (props) => {
  const {
    style,
    selectedChannel,
    updateChannel,
    addTemplate,
    removeTemplates,
  } = props;

  const channels = AVAILABLE_CHANNELS_OPTION;
  const defaultStyle = {};
  const handleChange = (event, index, channel) => {
    updateChannel(channel);
    removeTemplates();
    getTemplates(channel, addTemplate);
  };

  return (
    <SelectField
      style={{ defaultStyle, ...style }}
      value={selectedChannel}
      onChange={handleChange}
      floatingLabelText="Select Channel"
      errorText={selectedChannel ? '' : 'Required'}
    >
      {channels.map((el, index) => (
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
  dispatch => ({
    updateChannel: channel => dispatch({
      type: 'SELECT_CHANNEL',
      channel,
    }),
    addTemplate: ({ name, template }) => dispatch({
      type: 'ADD_TEMPLATE',
      name,
      template,
    }),
    removeTemplates: () => dispatch({ type: 'REMOVE_TEMPLATES' }),
  })
)(ChannelSelectBox);
